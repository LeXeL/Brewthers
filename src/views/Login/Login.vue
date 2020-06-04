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
import 'firebase/auth'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        submit() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                )
                .then(data => {
                    data.user
                        .updateProfile({
                            displayName: this.form.name,
                        })
                        .then(() => {})
                })
                .catch(err => {
                    this.error = err.message
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