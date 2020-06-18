<template>
    <q-page class="pattern-bg q-pa-xl">
        <div class="row">
            <div class="col q-pa-lg">
                <div class="text-h3">Crea tu cuenta</div>
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
                                filled
                                v-model="form.restaurantName"
                                class="q-mb-md"
                                label="Nombre del restaurante"
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio',]"
                            />
                            <q-input
                                filled
                                v-model="form.name"
                                class="q-mb-md"
                                label="Nombre"
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio',]"
                            />
                            <q-input
                                filled
                                v-model="form.lastName"
                                class="q-mb-md"
                                label="Apellido"
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio',]"
                            />
                            <q-input
                                filled
                                v-model="form.email"
                                class="q-mb-md"
                                label="Correo"
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                            />
                            <q-input
                                filled
                                v-model="form.contactPhone"
                                class="q-mb-md"
                                label="Celular"
                                mask="####-####"
                                fill-mask
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                            />
                        </q-form>
                    </q-card-section>
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
                                filled
                                v-model="form.address"
                                class="q-mb-md"
                                label="Direccion"
                                dark
                                :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                            />
                            <GoogleMaps @markerPosition="setMarkerPosition"></GoogleMaps>
                        </q-form>
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
                        <q-form>
                            <q-form>
                                <q-input
                                    filled
                                    type="password"
                                    v-model="form.password"
                                    class="q-mb-md"
                                    label="Contraseña"
                                    dark
                                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                                />
                                <q-input
                                    filled
                                    type="password"
                                    v-model="form.repassword"
                                    class="q-mb-md"
                                    label="Repite la contraseña"
                                    dark
                                    :rules="[val => val.length > 0 || 'El campo es obligatorio']"
                                />
                            </q-form>
                        </q-form>
                    </q-card-section>
                </q-card>
                <div class="row">
                    <q-space />
                    <q-btn class="q-mt-md" color="primary" @click="createuser">Registrar</q-btn>
                </div>
            </div>
        </div>
        <q-dialog v-model="confirmationDialog">
            <q-card dark class="text-white" style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">¡Hemos recibido tu información!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Hemos recivido tu información satisfactoriamente. Uno de nuestros
                    administradores aprobará tu cuenta para que empieces a
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
            /* */
            profileInfo: {
                restName: 'La Casa de Pepe',
                contactName: 'Pepe',
                contactLastName: 'Veraz',
                email: 'pepe.veraz@gmail.com',
                cellphone: '6262-6262',
            },
            addressInfo: {
                textAddress: 'Somewhere in Pma, 3th Street',
            },
            passwordInfo: {
                actualPass: 'asdf123',
                newPass: 'qwe123',
            },
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
