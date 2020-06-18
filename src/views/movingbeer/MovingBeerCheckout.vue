<template>
    <q-page class="q-pa-xl">
        <div class="row">
            <div class="col"></div>
            <div class="col-lg-5">
                <div class="text-h3 q-mb-xl">{{ title }}</div>
            </div>
            <div class="col-lg-2"></div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-lg-5">
                <div class="text-h5 q-mb-lg">Detalle de articulos:</div>
                <div class="row q-mb-lg" v-for="(item, i) in 3" :key="i">
                    <div class="col-lg-2">
                        <q-img :src="require('@/assets/beer.jpg')" class="rounded-borders" />
                    </div>
                    <div class="col-lg-10 q-pl-md">
                        <div class="text-h6" style="color: #27a3c3">Nombre de lo que estan comprando</div>
                        <div class="text-subtitle-2">Estilo: Something</div>
                        <div class="text-subtitle-2">Alcohol: 5%</div>
                        <div class="text-subtitle-2">IBU: 150</div>
                        <div class="text-subtitle-2">Precio unitario: $ 5.50</div>
                        <div class="text-subtitle-2">Cantidad: 10</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="q-mb-xl">
                    <div class="text-h5 q-mb-md">Detalle de orden:</div>
                    <div class="text-subitle-2">Articulos (10): $ 150.00</div>
                    <div class="text-subitle-2">ITBMS: $ 10.50</div>
                    <div class="text-h6">Total: $ 160.50</div>
                </div>

                <div class="row" v-if="orderStatus === 'open'">
                    <div class="text-h5 q-mb-md">Metodo de pago:</div>
                </div>
                <div class="row q-mb-lg" v-if="orderStatus === 'open'">
                    <q-option-group
                        :options="paymentOptions"
                        label="Notifications"
                        type="radio"
                        v-model="paymentMethod"
                    />
                </div>
                <div
                    class="row"
                    v-if="proofRequired.includes(paymentMethod) && orderStatus === 'open'"
                >
                    <div class="text-h5 q-mb-md">Comprobante de pago:</div>
                </div>
                <div
                    class="row q-mb-lg"
                    v-if="proofRequired.includes(paymentMethod) && orderStatus === 'open'"
                >
                    <q-file outlined color="white" dark label="Adjuntar comprobante">
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>
                </div>
                <q-btn
                    class="full-width"
                    color="primary"
                    label="Enviar orden"
                    @click="sendOrder"
                    v-if="orderStatus == 'open'"
                />
                <q-btn
                    class="full-width"
                    color="primary"
                    label="Volver a Movingbeer"
                    v-else
                    to="/movingbeer"
                />
            </div>
            <div class="col"></div>
        </div>
        <q-dialog v-model="orderConfirmationDialog">
            <q-card dark class="text-white">
                <q-card-section>
                    <div class="text-h6">Enviado con exito</div>
                </q-card-section>

                <q-card-section
                    class="q-pt-none"
                >Tu orden ha sido enviada con exito. Pronto nos pondremos en contacto contigo.</q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            orderStatus: 'open',
            title: 'Confirmacion de orden',
            orderConfirmationDialog: false,
            paymentMethod: '',
            proofRequired: ['ach', 'yappy', 'nequi'],
            paymentOptions: [
                {
                    label: 'ACH',
                    value: 'ach',
                },
                {
                    label: 'Yappy',
                    value: 'yappy',
                },
                {
                    label: 'Nequi',
                    value: 'nequi',
                },
                {
                    label: 'Credito',
                    value: 'credit',
                },
                {
                    label: 'POS',
                    value: 'pos',
                },
            ],
        }
    },
    methods: {
        sendOrder() {
            this.orderStatus = 'sent'
            this.title = 'Orden enviada con exito'
            this.orderConfirmationDialog = true
        },
    },
}
</script>
