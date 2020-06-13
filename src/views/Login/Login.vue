<template>
    <q-page class="pattern-bg window-height window-width row justify-center items-center">
        <div class="column">
            <div class="q-pa-md q-gutter-sm" v-if="dismissCountDown > 0">
                <q-banner inline-actions rounded class="bg-red text-white">
                    {{errorMessage}}
                    <template v-slot:action>
                        <q-btn flat label="Dismiss" @click="dismissCountDown = 0" />
                    </template>
                </q-banner>
            </div>
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
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            email: '',
            password: '',
            dismissSecs: 15,
            dismissCountDown: 0,
        }
    },
    methods: {
        async login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    await this.$store.dispatch('setCurrentUser', user)
                    this.$router.push('/movingbeer')
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
    mounted() {
        console.log(this.user)
        if (this.user) this.$router.push('/movingbeer')
    },
}
</script>

<style>
.q-card {
    width: 360px;
}
</style>