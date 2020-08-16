<template>
    <q-page class="pattern-bg">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <div class="absolute-bottom"></div>
        <div class="absolute-center">
            <div class="row">
                <q-img :src="require('@/assets/logo-horizontal.png')" class="q-mb-lg" />
                <q-card dark square class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input
                                dark
                                square
                                filled
                                v-model="email"
                                type="email"
                                label="Correo Electronico"
                                :rules="[
                                        val => val.length > 0 || 'El campo es obligatorio',
                                    ]"
                            ></q-input>
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="primary"
                            size="lg"
                            class="full-width"
                            label="Enviar Correo"
                            @click="resetPassword"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            email: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        resetPassword() {
            this.displayLoading = true
            firebase
                .auth()
                .sendPasswordResetEmail(this.email)
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
    },
}
</script>

<style lang="scss" scoped>
</style>