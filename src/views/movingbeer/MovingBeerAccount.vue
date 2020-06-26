<template>
    <q-page class="pattern-bg" v-if="Object.keys(user).length !== 0 ">
        <div class="row">
            <div class="col q-pa-lg">
                <div class="text-h4">{{restName}}</div>
                <div class="text-h6">
                    Estatus:
                    <span style="color: #27a3c3">Aprobado</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
                <q-card flat bordered dark class="text-white full-width">
                    <q-card-section>
                        <div class="row">
                            <div class="col">
                                <div class="text-h6">Informacion general:</div>
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
                        >{{editGeneralInfo ? 'Guardar' : 'Editar'}}</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
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
                        >{{editAddressInfo ? 'Guardar' : 'Editar'}}</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
                <q-card flat bordered dark class="text-white full-width">
                    <q-card-section>
                        <div class="row">
                            <div class="col">
                                <div class="text-h6">Seguridad</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions>
                        <q-btn @click="resetPassword()" color="primary">Reiniciar Contraseña</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'
import GoogleMaps from '@/components/GoogleMaps'
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
        resetPassword() {
            firebase
                .auth()
                .sendPasswordResetEmail(this.user.email)
                .then(function() {
                    alert(
                        'Hemos enviado a tu correo un email para resetear la contraseña'
                    )
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        setMarkerPosition(event) {
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
                this.updateUserInformation()
                return
            }
            if (section === 'AddressInfo') {
                //Si editGeneralInfo es falso ponlo true y ya.
                if (!this.editAddressInfo) {
                    this.editAddressInfo = true
                    return
                }
                this.editAddressInfo = false
                this.updateUserInformation()
                return
            }
        },
        updateUserInformation() {
            api.updateuserinformation({uid: this.uid, user: this.userData})
                .then(response => {
                    //TODO: Vista de poner contraseña que no sea la default.
                    alert('Se ha actualizado con éxito la información')
                    this.$router.push('/movingbeer')
                })
                .catch(error => {
                    alert(
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    )
                    console.log(error)
                })
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        setMarkerPosition(event) {
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
                this.updateUserInformation()
                return
            }
            if (section === 'AddressInfo') {
                //Si editGeneralInfo es falso ponlo true y ya.
                if (!this.editAddressInfo) {
                    this.editAddressInfo = true
                    return
                }
                this.editAddressInfo = false
                this.updateUserInformation()
                return
            }
        },
        updateUserInformation() {
            api.updateuserinformation({uid: this.uid, user: this.userData})
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>