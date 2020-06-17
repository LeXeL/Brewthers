<template>
    <q-page>
        <div class="q-pa-md q-gutter-sm" v-if="dismissCountDown > 0">
            <q-banner inline-actions rounded class="bg-red text-white">
                {{ errorMessage }}
                <template v-slot:action>
                    <q-btn flat label="Dismiss" @click="dismissCountDown = 0" />
                </template>
            </q-banner>
        </div>
        <div class="pattern-bg q-pa-xl" style="height: 100vh">
            <h2>Crea una cuenta</h2>
            <q-form>
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre"
                    v-model="form.name"
                    :rules="[
                        val => val.length > 0 || 'El campo es obligatorio',
                    ]"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="text"
                    label="Apellido"
                    v-model="form.lastName"
                    :rules="[
                        val => val.length > 0 || 'El campo es obligatorio',
                    ]"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="email"
                    label="Email"
                    v-model="form.email"
                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre del restaurante"
                    v-model="form.restaurantName"
                    :rules="[
                        val => val.length > 0 || 'El campo es obligatorio',
                    ]"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="text"
                    label="Celular de contacto"
                    v-model="form.contactPhone"
                    mask="####-####"
                    fill-mask
                    :rules="[
                        val => val.length > 0 || 'El campo es obligatorio',
                    ]"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="password"
                    label="Contraseña"
                    v-model="form.password"
                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="password"
                    label="Confirmar contraseña"
                    v-model="form.repassword"
                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                />
                <q-input
                    class="q-mb-md"
                    dark
                    filled
                    type="text"
                    label="Dirección"
                    v-model="form.address"
                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                />
                <GoogleMaps @markerPosition="setMarkerPosition"></GoogleMaps>
                <q-btn color="primary" @click="createuser">Enviar</q-btn>
            </q-form>
        </div>
        <q-dialog v-model="confirmationDialog">
            <q-card dark class="text-white" style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">¡Hemos recibido tu información!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Hemos recivido tu información satisfactoriamente, Uno de nuestros
                    administradores aprobara tu cuenta para que empieces a
                    realizar pedidos.
                    <br />
                    <br />
                </q-card-section>

                <q-card-actions align="right">
                    <router-link to="/movingbeer">
                        <q-btn flat label="Aceptar" color="primary" v-close-popup />
                    </router-link>
                </q-card-actions>
            </q-card>
        </q-dialog>
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
            confirmationDialog: false,
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
            },
            dismissSecs: 15,
            dismissCountDown: 0,
        }
    },
    methods: {
        setMarkerPosition(event) {
            this.form.location = event
        },
        createuser() {
            this.dismissCountDown = 0
            if (this.form.password === this.form.repassword) {
                var strongRegex = new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                )
                if (strongRegex.test(this.form.password)) {
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (re.test(this.form.email)) {
                        firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                                this.form.email,
                                this.form.password
                            )
                            .then(async () => {
                                let user = await firebase.auth().currentUser
                                await this.$store.dispatch(
                                    'setCurrentUser',
                                    user
                                )
                                this.confirmationDialog = true
                                await api.updateuserwithinfo({
                                    uid: user.uid,
                                    obj: this.form,
                                })
                            })
                            .catch(error => {
                                // Handle Errors here.
                                console.log(error)
                                this.dismissCountDown = this.dismissSecs
                                this.errorCode = error.code
                                if (
                                    error.code === 'auth/email-already-in-use'
                                ) {
                                    this.errorMessage =
                                        'Este correo ya esta en uso registrado'
                                    return
                                }
                                this.errorMessage = error.message
                                // ...
                            })
                    } else {
                        this.dismissCountDown = this.dismissSecs
                        this.errorMessage =
                            'Por favor introduce un email valido'
                    }
                } else {
                    this.dismissCountDown = this.dismissSecs
                    this.errorMessage =
                        'Por favor introduce una contraseña mas fuerte. Debe contener 8 caracteres, al menos un numero (0-9), una mayúscula, una minúscula y carácter especial ( !@#$%^&* )'
                }
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
    },
}
</script>

<style  scoped></style>
