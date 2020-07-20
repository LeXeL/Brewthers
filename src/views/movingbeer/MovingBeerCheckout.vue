<template>
    <q-page class="q-pa-md pattern-bg" style="height: auto; background-repeat: repeat-y">
        <div class="row q-pt-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-8 col-xs-12">
                <div class="text-h4 q-mb-xl">{{ title }}</div>
            </div>
            <div class="col desktop-only"></div>
        </div>

        <div class="row">
            <div class="col desktop-only"></div>

            <div class="col-lg-8 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-8 col-sm-8 col-xs-12 q-mb-md">
                        <div class="text-h5 q-pl-md">Detalle de articulos:</div>
                        <order-item-details v-for="(item, i) in 5" :key="i" />
                    </div>
                    <div class="col-lg-4 col-sm-4 col-xs-12">
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
                            class="full-width q-mb-lg"
                            color="primary"
                            label="Enviar orden"
                            @click="sendOrder"
                            v-if="orderStatus == 'open'"
                        />
                        <q-btn
                            class="full-width q-mb-lg"
                            color="primary"
                            label="Volver a Movingbeer"
                            v-else
                            to="/movingbeer"
                        />
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
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
import OrderItemDetails from '@/components/general/OrderItemDetails'
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
    components: {
        'order-item-details': OrderItemDetails,
    },
}
</script>
