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
            :redirect="redirect"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="row">
            <div class="col desktop-only"></div>
            <div class="col-lg-4">
                <q-card dark class="full-width q-mt-xl">
                    <q-form @submit="createBrewery()">
                        <q-card-section class="text-center">
                            <q-img
                                :src="require('@/assets/brewthers-logo.png')"
                                style="width: 150px"
                            />
                        </q-card-section>
                        <q-card-section>
                            <div class="text-h6 text-center">
                                ¿Quieres vender tus productos con nosotros?
                                <br />
                                Llena el siguiente formulario para solicitar tu
                                cuenta.
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-input
                                filled
                                color="primary"
                                label="Nombre de casa cervecera"
                                dark
                                class="q-mb-md"
                                v-model="breweryInfo.brewingHouseName"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="RUC"
                                dark
                                class="q-mb-md"
                                v-model="breweryInfo.ruc"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="Nombre"
                                dark
                                class="q-mb-md"
                                v-model="breweryInfo.name"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="Apellido"
                                dark
                                class="q-mb-md"
                                v-model="breweryInfo.lastName"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="Correo"
                                dark
                                class="q-mb-md"
                                v-model="breweryInfo.email"
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
                                color="primary"
                                label="Celular"
                                dark
                                class="q-mb-md"
                                mask="####-####"
                                fill-mask
                                v-model="breweryInfo.phone"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="Contraseña"
                                dark
                                type="password"
                                class="q-mb-md"
                                v-model="breweryInfo.password"
                                :rules="[
                                    val =>
                                        val.length > 0 ||
                                        'El campo es obligatorio',
                                    val =>
                                        strongPass.test(val) ||
                                        'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.',
                                ]"
                            />
                            <q-input
                                filled
                                color="primary"
                                label="Repetir contraseña"
                                dark
                                class="q-mb-md"
                                type="password"
                                v-model="breweryInfo.repassword"
                                :rules="[
                                    val => !!val || 'El campo es obligatorio',
                                ]"
                            />
                        </q-card-section>
                        <q-card-actions>
                            <q-space />
                            <q-btn
                                label="Registrar"
                                color="primary"
                                type="submit"
                            />
                        </q-card-actions>
                    </q-form>
                </q-card>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>

<script>
import GenericNavbar from '@/components/general/GenericNavbar'
import * as api from '@/api/api'

export default {
    components: {
        GenericNavbar,
    },
    data() {
        return {
            breweryInfo: {
                brewingHouseName: '',
                name: '',
                lastName: '',
                ruc: '',
                email: '',
                phone: '',
                breweryId: '',
                password: '',
                repassword: '',
            },
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            redirect: '',
        }
    },
    methods: {
        clearBreweryInputs() {
            this.breweryInfo = {
                brewingHouseName: '',
                name: '',
                lastName: '',
                ruc: '',
                email: '',
                phone: '',
                breweryId: '',
                password: '',
                repassword: '',
            }
        },
        createBrewery() {
            this.displayLoading = true
            if (this.breweryInfo.password !== this.breweryInfo.repassword) {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Las Contraseñas no considen!'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.breweryInfo.status = 'pending'
            api.createBreweryUserInformation({
                obj: this.breweryInfo,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Gracias por registrarte con nosotros, te hemos enviado un correo de confirmación y mientras tanto uno de nuestros administradores revisara tu cuenta para ser aprobada.'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.brewingHousesRegisterDialog = false
                    this.clearBreweryInputs()
                    this.redirect = '/movingbeer'
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Error al momento de crear la cuenta de esta casa cervecera'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
}
</script>