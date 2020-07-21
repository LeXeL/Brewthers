<template>
    <q-page class="q-pa-lg">
        <div class="row q-pa-lg">
            <div class="col">
                <div class="text-h4">Historial de pedidos</div>
            </div>
        </div>
        <div class="row q-pa-lg">
            <div class="col desktop-only"></div>
            <div class="col col-sm-12 col-xs-12 on-left">
                <q-input filled label="No. de orden" dark class="q-mb-md" />
            </div>
            <div class="col col-sm-12 col-xs-12 on-left">
                <q-select
                    filled
                    v-model="month"
                    :options="months"
                    label="Mes"
                    dark
                    class="q-mb-md"
                />
            </div>
            <div class="col col-sm-12 col-xs-12">
                <q-select filled v-model="year" :options="years" label="Año" dark class="q-mb-md" />
            </div>
        </div>
        <div class="row q-pa-lg">
            <div class="col">
                <q-card dark class="full-width q-mb-lg" v-for="order in 2" :key="order">
                    <q-card-section>
                        <div class="text-h5">
                            <span style="color: #27a3c3">No. de pedido:</span>
                            154623 -
                            <span style="color: #27a3c3">Estado:</span>
                            Por confirmar
                        </div>
                        <div class="text-subtitle-2">
                            <span style="color: #27a3c3">Fecha:</span> 1 de enero 2020
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-section>
                        <div class="row">
                            <div class="col-lg-9 col-sm-12 col-xs-12">
                                <div class="row" v-for="item in 3" :key="item">
                                    <div class="col-lg-7 col-sm-6 col-xs-12">
                                        <order-item-details />
                                    </div>
                                    <div class="col-lg-2 col-sm-2 col-xs-6 q-mb-md">
                                        <div class="text-h6" style="color: #27a3c3">Cantidad</div>
                                        <div class="text-subtitle-3">5</div>
                                    </div>
                                    <div class="col-lg-2 col-sm-4 col-xs-6 q-mb-md">
                                        <div class="text-h6" style="color: #27a3c3">Precio unitario</div>
                                        <div class="text-subtitle-2">$ 5.50</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-xs-12">
                                <order-proof-of-payment />
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions class="q-pa-md">
                        <q-space />
                        <div class="text-h6 on-left">
                            <span style="color: #27a3c3">Total:</span>
                            $ 150.00
                        </div>
                        <q-btn class="on-right" color="primary">Cancelar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="row q-mb-lg">
            <div class="col flex flex-center">
                <q-pagination v-model="current" :max="5" :direction-links="true"></q-pagination>
            </div>
        </div>
    </q-page>
</template>

<script>
import OrderItemDetails from '@/components/general/OrderItemDetails'
import OrderProofOfPayment from '@/components/general/OrderProofOfPayments'

export default {
    data() {
        return {
            month: '',
            year: '',
            current: 1,
            months: [
                {
                    label: '--',
                    value: '--',
                },
                {
                    label: 'Enero',
                    value: 'jan',
                },
                {
                    label: 'Febrero',
                    value: 'feb',
                },
                {
                    label: 'Marzo',
                    value: 'mar',
                },
                {
                    label: 'Abril',
                    value: 'abr',
                },
                {
                    label: 'Mayo',
                    value: 'may',
                },
                {
                    label: 'Junio',
                    value: 'jun',
                },
                {
                    label: 'Julio',
                    value: 'jul',
                },
                {
                    label: 'Agosto',
                    value: 'aug',
                },
                {
                    label: 'Septiembre',
                    value: 'sep',
                },
                {
                    label: 'Octubre',
                    value: 'oct',
                },
                {
                    label: 'Noviembre',
                    value: 'nov',
                },
                {
                    label: 'Diciembre',
                    value: 'dec',
                },
            ],
            years: [
                {
                    label: '2020',
                    value: '2020',
                },
                {
                    label: '2021',
                    value: '2021',
                },
                {
                    label: '2022',
                    value: '2022',
                },
                {
                    label: '2023',
                    value: '2023',
                },
                {
                    label: '2024',
                    value: '2024',
                },
            ],
        }
    },
    components: {
        'order-item-details': OrderItemDetails,
        'order-proof-of-payment': OrderProofOfPayment,
    },
}
</script>