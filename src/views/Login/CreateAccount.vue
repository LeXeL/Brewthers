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
                <q-input class="q-pb-md" dark filled type="password" label="Confirmar contraseña" />
                <q-btn color="primary" @click="createuser">Enviar</q-btn>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import * as firebase from 'firebase'
import 'firebase/auth'

export default {
    data() {
        return {
            form: {
                name: 'Diego',
                lastName: 'Rodriguez',
                email: 'diego.r2892@gmail.com',
                restaurantName: 'la papa caliente',
                contactPhone: '666666666',
                password: 'atletico',
            },
            dismissSecs: 15,
            dismissCountDown: 0,
        }
    },
    methods: {
        createuser() {
            console.log('entro')
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                )
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    // await this.$store.dispatch('setCurrentUser', user)
                    api.updateuserwithinfo({uid: user.uid, obj: this.form})
                })
                .catch(error => {
                    // Handle Errors here.
                    console.log(error)
                    this.dismissCountDown = this.dismissSecs
                    this.errorCode = error.code
                    this.errorMessage = error.message
                    // ...
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
