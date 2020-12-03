<template>
    <div class="blog-bg text-white" style="position: relative">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="title-section absolute-center">
            <h2 class="q-mb-md">blog</h2>
            <q-input
                filled
                v-model="email"
                dark
                dense
                label="Suscribete a nuestro news letter."
                style="width: 400px; max-width: 80vw"
                @keyup.enter="addToEmailToNewsLetter()"
            >
                <template v-slot:after>
                    <q-btn round dense flat @click="addToEmailToNewsLetter()"
                        ><i class="far fa-paper-plane"></i
                    ></q-btn>
                </template>
            </q-input>
        </div>

        <router-link
            to="/blog"
            class="title-section-link absolute-bottom q-pb-xl text-white"
            >leer más</router-link
        >
    </div>
</template>
<script>
import * as api from '@/api/api'
export default {
    data() {
        return {
            email: '',
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            displayLoading: false,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    methods: {
        addToEmailToNewsLetter() {
            this.displayAlert = false
            if (this.email != '' && this.validEmail.test(this.email)) {
                this.displayLoading = true
                api.addToNewsletter({userEmail: this.email})
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'QUE XOPA'
                        this.alertMessage =
                            'Gracias por registrarte en nuestro newsletter'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.email = ''
                    })
                    .catch(error => {
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = 'error'
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            } else {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Por favor introduce un email valido'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
    },
}
</script>
