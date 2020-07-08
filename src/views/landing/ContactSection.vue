<template>
    <div class="pattern-bg contact-form">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <h2 class="q-ml-md title-section">Contacto</h2>
        <q-form>
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-input
                                color="white"
                                class="q-pa-md"
                                dark
                                filled
                                label="Nombre"
                                v-model="form.name"
                            />
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-input
                                color="white"
                                class="q-pa-md"
                                dark
                                filled
                                label="Apellido"
                                v-model="form.lastName"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-input
                                color="white"
                                class="q-pa-md"
                                dark
                                filled
                                label="Correo electronico"
                                v-model="form.email"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-select
                                class="q-pa-md"
                                color="white"
                                dark
                                filled
                                v-model="form.contactReason"
                                :options="options"
                                label="Razon de contacto"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="row">
                        <div class="col">
                            <q-input
                                class="q-pa-md"
                                color="white"
                                dark
                                filled
                                type="textarea"
                                label="Mensaje"
                                rows="10"
                                v-model="form.message"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row q-pa-md">
                <q-space />
                <q-btn label="Enviar" color="primary" @click="sendEmail()" />
            </div>
        </q-form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
    props: ['reason'],
    data() {
        return {
            form: {
                name: '',
                lastName: '',
                message: '',
                email: '',
                contactReason: '',
            },
            options: [
                'Alquiler de equipo draft',
                'Solicitar cotización de servicio',
                'Comprar caja o keg',
                'MovingBeer',
                'Otros',
            ],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    watch: {
        reason: function() {
            this.form.contactReason = 'Comprar caja o keg'
        },
    },
    methods: {
        sendEmail() {
            if (
                this.form.name === '' ||
                this.form.lastName === '' ||
                this.form.email === '' ||
                this.form.contactReason === '' ||
                this.form.message === ''
            ) {
                this.displayLoading = false
                this.displayAlert = true
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor asegurate de llenar todos los campos'
                this.alertType = 'error'
                return
            } else {
                this.displayLoading = true
                emailjs
                    .send(
                        'gmail',
                        'template_Nldne3t8',
                        this.form,
                        'user_l9KYZVj8DNvwXi3kegar5'
                    )
                    .then(
                        result => {
                            this.displayLoading = false
                            this.displayAlert = true
                            this.alertTitle = 'Exito!'
                            this.alertMessage =
                                'Se ha enviado tu petición con éxito, pronto un administrador se pondrá en contacto contigo.'
                            this.alertType = 'success'
                            this.form.name = ''
                            this.form.lastName = ''
                            this.form.email = ''
                            this.form.contactReason = ''
                            this.form.message = ''
                        },
                        error => {
                            this.displayLoading = false
                            this.displayAlert = true
                            this.alertTitle = 'Error'
                            this.alertMessage =
                                'Hubo un error por favor intentarlo nuevamente.'
                            this.alertType = 'error'
                        }
                    )
            }
        },
    },
}
</script>

<style></style>
