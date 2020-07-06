<template>
    <div class="pattern-bg contact-form">
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
                <q-btn label="Enviar" type="submit" color="primary" @click="sendEmail" />
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
                this.form.name === '' &&
                this.form.lastName === '' &&
                this.form.email === '' &&
                this.form.contactReazon === '' &&
                this.form.message === ''
            ) {
                alert('Por favor no dejes ningún campo vacío')
                return
            }
            emailjs
                .send(
                    'gmail',
                    'template_Nldne3t8',
                    this.form,
                    'user_l9KYZVj8DNvwXi3kegar5'
                )
                .then(
                    result => {
                        alert(
                            'Mensaje Enviado satisfactoria mente. \nUn administrador lo responderá  lo antes posible.'
                        )
                        console.log('SUCCESS!', result.status, result.text)
                    },
                    error => {
                        alert('Hubo un error por favor intentarlo nuevamente.')
                        console.log('FAILED...', error)
                    }
                )
        },
    },
}
</script>

<style></style>
