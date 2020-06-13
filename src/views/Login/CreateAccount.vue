<template>
    <q-page>
        <div class="q-pa-md q-gutter-sm" v-if="dismissCountDown > 0">
            <q-banner inline-actions rounded class="bg-red text-white">
                {{errorMessage}}
                <template v-slot:action>
                    <q-btn flat label="Dismiss" @click="dismissCountDown = 0" />
                </template>
            </q-banner>
        </div>
        <div class="pattern-bg q-pa-xl" style="height: 100vh">
            <h2>Crea una cuenta</h2>
            <q-form>
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre"
                    v-model="form.name"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Apellido"
                    v-model="form.lastName"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="email"
                    label="Email"
                    v-model="form.email"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre del restaurante"
                    v-model="form.restaurantName"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Celular de contacto"
                    v-model="form.contactPhone"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="password"
                    label="Contraseña"
                    v-model="form.password"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="password"
                    label="Confirmar contraseña"
                    v-model="form.repassword"
                />
                <q-btn color="primary" @click="createuser">Enviar</q-btn>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            form: {
                name: '',
                lastName: '',
                email: '',
                restaurantName: '',
                contactPhone: '',
                password: '',
                repassword: '',
            },
            dismissSecs: 15,
            dismissCountDown: 0,
        }
    },
    methods: {
        createuser() {
            if (this.form.password === this.form.repassword) {
                var strongRegex = new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                )
                if (strongRegex.test(this.form.password)) {
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (re.test(this.form.email)) {
                        if (
                            this.form.name != '' &&
                            this.form.lastName != '' &&
                            this.form.restaurantName != '' &&
                            this.form.contactPhone != ''
                        ) {
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
                                    api.updateuserwithinfo({
                                        uid: user.uid,
                                        obj: this.form,
                                    })
                                })
                                .catch(error => {
                                    // Handle Errors here.
                                    console.log(error)
                                    this.dismissCountDown = this.dismissSecs
                                    this.errorCode = error.code
                                    this.errorMessage = error.message
                                    // ...
                                })
                        } else {
                            this.dismissCountDown = this.dismissSecs
                            this.errorMessage =
                                'Por favor llenar todos los datos pedidos'
                        }
                    } else {
                        this.dismissCountDown = this.dismissSecs
                        this.errorMessage =
                            'Por favor introduce un email valido'
                    }
                } else {
                    this.dismissCountDown = this.dismissSecs
                    this.errorMessage =
                        'Por Favor introduce una contraseña mas fuerte tiene que tener 8 caracteres, Almenos una mayuscula y una minuscula y un simbolo que no sea un caracter( !@#$%^&* )'
                }
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
