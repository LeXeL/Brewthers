<template>
    <q-page
        class="pattern-bg q-pa-xl"
        style="height: auto; background-repeat: repeat-y"
    >
        <generic-navbar />
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="row">
            <div class="col q-pa-lg">
                <div class="text-h3 text-white">Crea tu cuenta</div>
            </div>
        </div>
        <q-form @submit="createUser">
            <div class="row">
                <div class="col col-lg-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">
                                        Información general:
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-input
                                filled
                                v-model="form.restaurantName"
                                class="q-mb-md"
                                label="Nombre del restaurante"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.ruc"
                                class="q-mb-md"
                                label="RUC"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.name"
                                class="q-mb-md"
                                label="Nombre"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.lastName"
                                class="q-mb-md"
                                label="Apellido"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.email"
                                class="q-mb-md"
                                label="Correo"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                    val =>
                                        validEmail.test(val) ||
                                        'Formato de correo incorrecto',
                                ]"
                            />
                            <q-input
                                filled
                                v-model="form.contactPhone"
                                class="q-mb-md"
                                label="Celular"
                                mask="####-####"
                                fill-mask
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col col-lg-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">Dirección:</div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-input
                                filled
                                v-model="form.address"
                                class="q-mb-md"
                                label="Dirección"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                ]"
                            />
                            <GoogleMaps
                                @markerPosition="setMarkerPosition"
                                @newMarkerPosition="setNewMarkerPosition"
                                :editable="true"
                                :markers="markers"
                                :mapCenter="center"
                            ></GoogleMaps>
                            <div class="text-subtitle2 text-red-7 q-mt-sm">
                                Recuerda seleccionar tu ubicación exacta en el
                                mapa.
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col col-lg-4 col-xs-12 q-pa-lg">
                    <q-card flat bordered dark class="text-white full-width">
                        <q-card-section>
                            <div class="row">
                                <div class="col">
                                    <div class="text-h6">Contraseña:</div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-input
                                filled
                                type="password"
                                v-model="form.password"
                                class="q-mb-md"
                                label="Contraseña"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                    val =>
                                        strongPass.test(val) ||
                                        'Debe tener 8 caracteres e incluir mayuscula, minuscula y numero.',
                                ]"
                            />
                            <q-input
                                filled
                                type="password"
                                v-model="form.repassword"
                                class="q-mb-md"
                                label="Repite la contraseña"
                                dark
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                    val =>
                                        val == form.password ||
                                        'Las contraseñas no coinciden',
                                ]"
                            />
                            <q-checkbox dark v-model="terms"
                                >Acepto los términos y condiciones.</q-checkbox
                            >
                            <a
                                class="on-right text-primary"
                                href="/terminos-y-condiciones"
                                target="_blank"
                                >Leer aqui.</a
                            >
                        </q-card-section>
                    </q-card>
                    <div class="row">
                        <q-space />
                        <q-btn class="q-mt-md" color="primary" type="submit"
                            >Registrar</q-btn
                        >
                    </div>
                </div>
            </div>
        </q-form>
        <q-dialog v-model="confirmationDialog">
            <q-card
                dark
                class="text-white"
                style="width: 700px; max-width: 80vw"
            >
                <q-card-section>
                    <div class="text-h6">¡Hemos recibido tu información!</div>
                </q-card-section>

                <q-card-section>
                    Hemos recibido tu información satisfactoriamente. Uno de
                    nuestros administradores aprobará tu cuenta para que
                    empieces a realizar pedidos.
                </q-card-section>
                <q-card-section>
                    <div class="text-subtitle2 text-red-7">
                        Favor también verifica tu bandeja de correos no deseados
                        (SPAM).
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        label="Aceptar"
                        color="primary"
                        v-close-popup
                        to="/movingbeer"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="brewingHouseRegisterDialog">
            <q-card dark>
                <q-card-section class="text-center">
                    <q-img
                        :src="require('@/assets/brewthers-logo.png')"
                        style="width: 150px"
                    />
                </q-card-section>
                <q-card-section>
                    <div class="text-h5 text-center">
                        ¿Quieres vender tus productos con nosotros?
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn
                        color="primary"
                        flat
                        label="registro de restaurantes"
                        v-close-popup
                    />
                    <q-btn
                        color="secondary"
                        label="vender"
                        @click="$router.push('/create-account-brewing-house')"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'
import GoogleMaps from '@/components/general/GoogleMaps'
import GenericNavbar from '@/components/general/GenericNavbar'

export default {
    components: {
        GoogleMaps,
        GenericNavbar,
    },
    data() {
        return {
            markers: [],
            terms: false,
            center: {},
            displayLoading: false,
            confirmationDialog: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            form: {
                name: '',
                lastName: '',
                email: '',
                restaurantName: '',
                contactPhone: '',
                password: '',
                repassword: '',
                address: '',
                location: null,
                ruc: '',
            },
            brewingHouseRegisterDialog: true,
            dismissSecs: 15,
            dismissCountDown: 0,
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    mounted() {
        this.geolocate()
    },
    methods: {
        geolocate() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    this.markers.push({position: this.center})
                },
                error => {
                    this.center = {
                        lat: 8.965975885948076,
                        lng: -79.53750488336794,
                    }
                    this.markers.push({position: this.center})
                }
            )
        },
        setMarkerPosition(event) {
            this.form.location = event
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
            this.form.location = event
        },
        createUser() {
            if (!this.terms) {
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Debes llenar todos los campos y aceptar los términos y condiciones.'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.dismissCountDown = 0
            this.displayLoading = true
            if (this.form.password === this.form.repassword) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.form.email,
                        this.form.password
                    )
                    .then(async user => {
                        await this.$store.dispatch('setCurrentUser', user.user)
                        await api
                            .createuserondatabase({
                                user: user.user,
                            })
                            .then(() => {
                                this.displayLoading = false
                                this.confirmationDialog = true
                                if (this.form.location === null)
                                    this.form.location = {
                                        lat: 8.965975885948076,
                                        lng: -79.53750488336794,
                                    }
                                api.updateuserwithinfo({
                                    uid: user.user.uid,
                                    obj: this.form,
                                })
                            })
                            .then(async () => {
                                await api
                                    .getuserinformationbyid({
                                        uid: user.user.uid,
                                    })
                                    .then(response => {
                                        this.$store.commit(
                                            'SET_USER',
                                            response.data.data
                                        )
                                    })
                            })
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.displayLoading = false
                        console.log(error)

                        this.errorCode = error.code
                        switch (error.code) {
                            case 'auth/user-disabled':
                                this.errorMessage =
                                    'La cuenta esta deshabilitada por favor comunicarse con un administrador.'
                                break
                            case 'auth/user-not-found':
                                this.errorMessage =
                                    'No se ha encontrado ese correo en nuestra base de datos por favor crea una cuenta.'
                                break
                            case 'auth/wrong-password':
                                this.errorMessage =
                                    'El usuario o la contraseña está equivocado por favor revisar.'
                                break
                            case 'auth/invalid-email':
                                this.errorMessage =
                                    'El usuario o la contraseña está equivocado por favor revisar.'
                                break
                            case 'auth/email-already-in-use':
                                this.errorMessage =
                                    'Este correo ya esta en uso registrado'
                                break
                            default:
                                this.errorMessage =
                                    'Hubo un error con tu peticion por favor intentalo mas tarde'
                                break
                        }

                        this.alertTitle = 'Hey AWANTA!'
                        this.alertMessage = this.errorMessage
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            } else {
                this.errorMessage = 'Las Contraseñas no son iguales'
                this.alertTitle = 'Hey AWANTA!'
                this.alertMessage = this.errorMessage
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
    },
}
</script>

<style scoped></style>
