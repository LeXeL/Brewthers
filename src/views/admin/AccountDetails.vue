<template>
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div v-if="!!data">
            <div class="text-h5 q-mb-md text-white">Detalles de cuenta</div>
            <div class="row">
                <div class="col-lg-4 col-md-4 q-pa-md">
                    <div class="row q-mb-md">
                        <q-input
                            filled
                            label="Nombre del comercio"
                            :value="data.restaurantName"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Tipo de cuenta"
                            :value="data.role"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="RUC"
                            :value="data.ruc"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Persona de contacto"
                            :value="data.name + ' ' + data.lastName"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Correo"
                            :value="data.email"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Celular"
                            :value="data.contactPhone"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Direccion"
                            :value="data.address"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                        <q-input
                            filled
                            label="Estatus"
                            :value="data.status"
                            class="q-mb-md full-width"
                            dark
                            readonly
                        />
                    </div>

                    <div class="row" v-if="data.logs">
                        <div class="text-h6 text-white">Log de cuenta:</div>
                        <q-list dark padding class="full-width">
                            <q-item
                                clickable
                                v-ripple
                                v-for="(log, index) in data.logs"
                                :key="index"
                            >
                                <!-- <q-item-section
                                >{{ returnTime(log.time) }} - {{ log.action }} -
                                {{ log.section }}
                                {{
                                    log.who ? 'who: ' + log.who : ''
                                }}</q-item-section
                                >-->
                                <q-item-section>
                                    {{ formatLog(log.action) }}
                                    {{ formatLog(log.section) }} -
                                    {{ log.who ? `Por: ${log.who} - ` : '' }}
                                    {{ returnTime(log.time) }}
                                    <br />
                                    <ul v-if="Array.isArray(log.section)">
                                        <li
                                            v-for="(reason, i) in log.section"
                                            :key="i"
                                        >
                                            {{ reason }}
                                        </li>
                                    </ul>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-xs-12 q-pa-md">
                    <GoogleMaps
                        class="full-width q-mb-md"
                        :editable="false"
                        :markers="[{position: data.location}]"
                        :mapCenter="data.location"
                    ></GoogleMaps>
                    <div class="row">
                        <q-select
                            :options="['Casa Bruja', 'Central', 'Rana Dorada']"
                            label="Seleccione casa cervecera a enlazar"
                            class="full-width q-mb-md"
                            v-model="linkBrewingHouse"
                            dark
                            filled
                        />
                    </div>
                    <div class="row">
                        <q-btn
                            v-if="data.status != 'approved'"
                            color="secondary"
                            label="Aceptar"
                            @click="approveUser()"
                            class="on-left"
                        />
                        <q-btn
                            v-if="data.status === 'pending'"
                            color="red-7"
                            label="Reachazar"
                            @click="rejectDialog = true"
                        />
                    </div>
                </div>
            </div>
            <q-dialog v-model="rejectDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw" dark>
                    <q-card-section>
                        <div class="text-h6">Motivos</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-option-group
                            :options="options"
                            label="Notifications"
                            type="checkbox"
                            dark
                            v-model="group"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn color="red-7" label="Cancelar" v-close-popup />
                        <q-btn
                            color="secondary"
                            label="Confirmar"
                            @click="addRejectedReasons()"
                            v-close-popup
                        />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script>
import GoogleMaps from '@/components/general/GoogleMaps'
import * as api from '@/api/api'

import moment from 'moment'

export default {
    components: {
        GoogleMaps,
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            rejectDialog: false,
            group: [],
            data: '',
            linkBrewingHouse: '',
            options: [
                {
                    label: 'No representa un comercio',
                    value: 'No representa un comercio',
                },
                {
                    label:
                        'El RUC brindado no existe en la base de datos de la Republica de Panama',
                    value:
                        'El RUC brindado no existe en la base de datos de la Republica de Panama',
                },
                {
                    label:
                        'El comercio se encuentra fuera de las areas de entrega (Ciudad de Panama)',
                    value:
                        'El comercio se encuentra fuera de las areas de entrega (Ciudad de Panama)',
                },
                {
                    label:
                        'Ya existe un representante de ese comercio (Duplicado)',
                    value:
                        'Ya existe un representante de ese comercio (Duplicado)',
                },
            ],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY, h:mm:ss a')
        },
        addRejectedReasons() {
            this.displayLoading = true
            let data = this.data
            let reasons = []
            this.group.forEach(reason => {
                this.options.forEach(option => {
                    if (option.value === reason) reasons.push(option.label)
                })
            })
            data.status = 'rejected'
            let obj = {}
            obj.time = Date.now()
            obj.action = 'rejected'
            obj.section = reasons
            obj.who = this.user.email
            data.logs.push(obj)
            api.updateToRejectUser({
                uid: this.$route.params.id,
                user: data,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha agregado las razones de rechazo'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.prompt = false
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        approveUser() {
            this.displayLoading = true
            let data = this.data
            data.status = 'approved'
            let obj = {}
            obj.time = Date.now()
            obj.action = 'approved'
            obj.section = ''
            obj.who = this.user.email
            data.logs.push(obj)
            api.updateToAproveUser({
                uid: this.$route.params.id,
                user: data,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha aprovado el usuario'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.prompt = false
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        formatLog(s) {
            if (s == 'edited') return 'Se edito: '
            if (s == 'Account Created') return 'Cuenta creada'
            if (s == 'GeneralInfo') return 'Informacion general'
            if (s == 'AddressInfo') return 'Informacion de direccion'
            if (s == 'rejected') return 'Se rechazo la cuenta'
            if (s == 'approved') return 'Se aprobo la cuenta'
        },
    },
    mounted() {
        this.displayLoading = true
        api.getuserinformationbyid({uid: this.$route.params.id})
            .then(user => {
                this.data = user.data.data
                if (
                    this.data.logs.length === 0 ||
                    this.data.logs[0].action != 'Account Created'
                ) {
                    this.data.logs.splice(0, 0, {
                        time: this.data.creationTime,
                        action: 'Account Created',
                        section: '',
                    })
                }
            })
            .then(() => {
                this.displayLoading = false
            })
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
<style scoped></style>
