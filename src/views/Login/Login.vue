<template>
    <q-page class="pattern-bg window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Brewthers</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input
                                square
                                filled
                                clearable
                                v-model="email"
                                type="email"
                                label="email"
                            />
                            <q-input
                                square
                                filled
                                clearable
                                v-model="password"
                                type="password"
                                label="password"
                            />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="primary"
                            size="lg"
                            class="full-width"
                            label="Login"
                            @click="login"
                        />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">
                            Necesitas una cuenta?
                            <router-link class="text-grey-9" to="createaccount">Creala Aquí</router-link>
                        </p>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/auth'

export default {
    name: 'Login',
    data() {
        return {
            email: 'lexelEZ@gmail.com',
            password: 'Atletico123!',
        }
    },
    methods: {
        async login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    console.log(`user: ${JSON.stringify(user, null, 2)}`)
                    // await this.$store.dispatch('setCurrentUser', user)
                    // this.$router.push('/')
                })
                .catch(error => {
                    // Handle Errors here.
                    this.dismissCountDown = this.dismissSecs
                    this.errorCode = error.code
                    this.errorMessage = error.message
                    // ...
                })
        },
    },
}
</script>

<style>
.q-card {
    width: 360px;
}
</style>