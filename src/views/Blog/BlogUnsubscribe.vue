<template>
    <q-page>
        <div class="row">
            <q-space />
            <div
                class="col-lg-5 q-py-xl text-center"
                v-if="!completeUnsubscribe"
            >
                <div class="text-h3 text-primary q-mb-sm">¡No te vayas!</div>
                <div class="text-h3 q-mb-xl">Tu eres chevere.</div>
                <div class="text-h6 q-mb-xl">
                    Al hacer clic en el boton de abajo, estaras dando de baja tu
                    correo <span class="text-primary">{{ email }}</span> de
                    nuestro listado de newsletter.
                </div>
                <q-btn
                    label="Dar de baja"
                    push
                    color="primary"
                    @click="unsubscribe()"
                />
            </div>
            <div class="col-lg-6 q-py-xl text-center" v-else>
                <div class="text-h3 text-primary q-mb-xl">
                    Te hemos dado de baja satisfactoriamente
                </div>
                <div class="text-h6 q-mb-xl">
                    Hemos eliminado tu correo de nuestro listado de newsletter,
                    ya no te volveremos a molestar. 👍
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
export default {
    data() {
        return {
            completeUnsubscribe: false,
            email: 'myemail@email.com',
        }
    },
    methods: {
        unsubscribe() {
            this.completeUnsubscribe = true
            api.unsubscribeFromNewsletter({
                userEmail: this.email,
            }).then(response => console.log(response))
        },
    },
    mounted() {
        this.email = this.$route.params.email
    },
}
</script>