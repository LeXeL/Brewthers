<template>
    <div class="blog-bg" style="position: relative">
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
            class="title-section-link absolute-bottom q-pb-xl"
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
        }
    },
    methods: {
        addToEmailToNewsLetter() {
            if (this.email != '') {
                api.addToNewsletter({userEmail: this.email})
                    .then(response => {
                        this.alertTitle = 'QUE XOPA'
                        this.alertMessage =
                            'Gracias por registrarte en nuestro newsletter'
                        this.alertType = 'success'
                        this.displayAlert = true
                    })
                    .catch(error => {
                        this.alertTitle = 'Error'
                        this.alertMessage = 'error'
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            }
        },
    },
}
</script>