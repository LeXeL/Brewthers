<template>
    <q-page
        class="pattern-bg"
        style="height: auto; background-repeat: repeat-y"
    >
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div v-if="Object.keys(user).length !== 0">
            <div class="row">
                <div class="col q-pa-lg">
                    <div class="text-h4">{{ restName }}</div>
                    <div class="text-h6">
                        Estatus:
                        <span style="color: #27a3c3">
                            {{ accountStatus(user.status) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">
                                        Informacion general:
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-form>
                                <q-input
                                    outlined
                                    v-model="userData.restaurantName"
                                    class="q-mb-md"
                                    label="Nombre del restaurante"
                                    dark
                                    :disable="!editGeneralInfo"
                                />
                                <q-input
                                    outlined
                                    v-model="userData.name"
                                    class="q-mb-md"
                                    label="Nombre"
                                    dark
                                    :disable="!editGeneralInfo"
                                />
                                <q-input
                                    outlined
                                    v-model="userData.lastName"
                                    class="q-mb-md"
                                    label="Apellido"
                                    dark
                                    :disable="!editGeneralInfo"
                                />
                                <q-input
                                    outlined
                                    v-model="userData.contactPhone"
                                    class="q-mb-md"
                                    label="Celular"
                                    dark
                                    :disable="!editGeneralInfo"
                                />
                            </q-form>
                        </q-card-section>
                        <q-separator dark />
                        <q-card-actions>
                            <q-btn
                                color="primary"
                                @click="handleData('GeneralInfo')"
                                >{{
                                    editGeneralInfo ? 'Guardar' : 'Editar'
                                }}</q-btn
                            >
                        </q-card-actions>
                    </q-card>
                </div>
                <div class="col-lg-4 col-md-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">Direccion:</div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-form>
                                <q-input
                                    outlined
                                    v-model="userData.address"
                                    class="q-mb-md"
                                    label="Direccion"
                                    dark
                                    :disable="!editAddressInfo"
                                />
                                <GoogleMaps
                                    @markerPosition="setMarkerPosition"
                                    @newMarkerPosition="setNewMarkerPosition"
                                    :editable="editAddressInfo"
                                    :mapCenter="center"
                                    :markers="markers"
                                ></GoogleMaps>
                            </q-form>
                        </q-card-section>
                        <q-separator dark />
                        <q-card-actions>
                            <q-btn
                                color="primary"
                                @click="handleData('AddressInfo')"
                                >{{
                                    editAddressInfo ? 'Guardar' : 'Editar'
                                }}</q-btn
                            >
                        </q-card-actions>
                    </q-card>
                </div>
                <div class="col-lg-4 col-md-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">Seguridad</div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn @click="resetPassword()" color="primary"
                                >Reiniciar Contraseña</q-btn
                            >
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'
import GoogleMaps from '@/components/general/GoogleMaps'
export default {
    components: {
        GoogleMaps,
    },
    data() {
        return {
            userData: {},
            editGeneralInfo: false,
            editAddressInfo: false,
            markers: [],
            center: {},
            restName: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    computed: {
        user() {
            let userInfo = this.$store.getters.user
            this.userData = userInfo
            return userInfo
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    created() {
        api.getuserinformationbyid({uid: this.uid}).then(response => {
            this.$store.commit('SET_USER', response.data.data)
        })
    },
    mounted() {
        this.restName = this.userData.restaurantName
        this.center = this.userData.location
        this.markers.push({position: this.center})
    },
    methods: {
        accountStatus(status) {
            if (status == 'approved') return 'Aprobada'
            if (status == 'rejected') return 'Rechazada'
            else return 'Pendiente'
        },
        resetPassword() {
            firebase
                .auth()
                .sendPasswordResetEmail(this.user.email)
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Hemos enviado a tu correo un email para resetear la contraseña'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        setMarkerPosition(event) {
            this.userData.location = event
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
            this.userData.location = event
        },
        handleData(section) {
            if (section === 'GeneralInfo') {
                //Si editGeneralInfo es falso ponlo true y ya.
                if (!this.editGeneralInfo) {
                    this.editGeneralInfo = true
                    return
                }
                this.editGeneralInfo = false
                this.updateUserInformation(section)
                return
            }
            if (section === 'AddressInfo') {
                //Si editGeneralInfo es falso ponlo true y ya.
                if (!this.editAddressInfo) {
                    this.editAddressInfo = true
                    return
                }
                this.editAddressInfo = false
                this.updateUserInformation(section)
                return
            }
        },
        updateUserInformation(section) {
            this.displayLoading = true
            let obj = {}
            obj.time = Date.now()
            obj.action = 'edited'
            obj.section = section
            this.userData.logs.push(obj)
            if (this.userData.status === 'rejected') {
                this.userData.status = 'pending'
            }
            api.updateuserinformation({uid: this.uid, user: this.userData})
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
}
</script>
