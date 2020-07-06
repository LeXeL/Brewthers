<template>
    <div class="q-pa-md" v-if="!!data">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <div class="text-h5 q-mb-md">Detalles de cuenta</div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <div class="row q-mb-md">
                    <q-input
                        filled
                        label="Nombre del restaurante"
                        :value="data.restaurantName"
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

                <div class="row" v-if="data.rejectionReasons">
                    <div class="text-h6">Motivos de rechazo de cuenta:</div>
                    <q-list dark padding class="full-width">
                        <q-item
                            clickable
                            v-ripple
                            v-for="rejections in data.rejectionReasons"
                            :key="rejections"
                        >
                            <q-item-section>{{rejections}}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
            <div class="col-lg-8 q-pa-md">
                <GoogleMaps
                    class="full-width q-mb-md"
                    :editable="false"
                    :markers="[{position:data.location}]"
                    :mapCenter="data.location"
                ></GoogleMaps>

                <div class="row">
                    <q-space />
                    <q-btn
                        color="secondary"
                        label="Aceptar"
                        @click="approveUser()"
                        class="on-left"
                    />
                    <q-btn color="red-7" label="Reachazar" @click="rejectDialog = true" />
                </div>
            </div>
        </div>
        <q-dialog v-model="rejectDialog" persistent>
            <q-card style="width: 700px; max-width: 80vw;" dark>
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
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Confirmar" @click="addRejectedReasons()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps'
import * as api from '@/api/api'

export default {
    components: {
        GoogleMaps,
    },
    data() {
        return {
            rejectDialog: false,
            group: [],
            data: '',
            options: [
                {label: 'Motivo de rechazo 1', value: 'op1'},
                {label: 'Motivo de rechazo 2', value: 'op2'},
                {label: 'Motivo de rechazo 3', value: 'op3'},
            ],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
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
            data.rejectionReasons = reasons

            api.updateuserinformation({
                uid: this.$route.params.id,
                user: data,
            })
                .then(() => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha agregado las razones de rechazo'
                    this.alertType = 'success'
                    this.prompt = false
                })
                .catch(error => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                })
        },
        approveUser() {
            this.displayLoading = true
            let data = this.data
            data.status = 'approved'
            api.updateuserinformation({
                uid: this.$route.params.id,
                user: data,
            })
                .then(() => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha aprovado el usuario'
                    this.alertType = 'success'
                    this.prompt = false
                })
                .catch(error => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                })
        },
    },
    mounted() {
        api.getuserinformationbyid({uid: this.$route.params.id})
            .then(user => {
                this.data = user.data.data
            })
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
<style scoped>
</style>