<template>
    <q-page class="q-pa-lg" v-if="Object.keys(data).length !== 0">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <div class="row q-pa-lg">
            <div class="col">
                <div class="text-h4">Historial de pedidos</div>
            </div>
        </div>
        <div class="row q-pa-lg">
            <div class="col desktop-only"></div>
            <!-- <div class="col-lg-3 col-sm-12 col-xs-12 on-left">
                <q-input filled label="No. de orden" dark class="q-mb-md" />
            </div>
            <div class="col-lg-3 col-sm-12 col-xs-12 on-left">
                <q-select
                    filled
                    v-model="month"
                    :options="months"
                    label="Mes"
                    dark
                    class="q-mb-md"
                />
            </div>
            <div class="col-lg-3 col-sm-12 col-xs-12">
                <q-select filled v-model="year" :options="years" label="Año" dark class="q-mb-md" />
            </div>-->
        </div>
        <div class="row q-pa-lg">
            <div class="col">
                <q-card dark class="full-width q-mb-lg" v-for="(order,index) in data" :key="index">
                    <q-card-section>
                        <div class="text-h5">
                            <span style="color: #27a3c3">No. de pedido:</span>
                            {{order.id}} -
                            <span
                                style="color: #27a3c3"
                            >Estado:</span>
                            {{returnStatus(order.status)}}
                        </div>
                        <div class="text-subtitle-2">
                            <span style="color: #27a3c3">Fecha:</span>
                            {{returnTime(order.logs[0])}}
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-section>
                        <div class="row">
                            <div class="col-lg-9 col-sm-12 col-xs-12">
                                <div class="row" v-for="(item,index) in order.cart" :key="index">
                                    <div class="col-lg-7 col-sm-6 col-xs-12">
                                        <order-item-details :data="removeUnUsedItem(item)" />
                                    </div>
                                    <div class="col-lg-2 col-sm-2 col-xs-6 q-mb-md">
                                        <div class="text-h6" style="color: #27a3c3">Cantidad</div>
                                        <div class="text-subtitle-3">{{item.amount}}</div>
                                    </div>
                                    <div class="col-lg-2 col-sm-4 col-xs-6 q-mb-md">
                                        <div class="text-h6" style="color: #27a3c3">Precio unitario</div>
                                        <div class="text-subtitle-2">$ {{item.price}}</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="col-lg-3 col-xs-12"
                                v-if="order.paymentMethod === 'nequi' || order.paymentMethod === 'yappy' || order.paymentMethod ===  'ach'"
                            >
                                <order-proof-of-payment
                                    :data="order.paymentProof"
                                    :fullOrder="order"
                                    :orderId="order.firebaseId"
                                    :restaurantId="order.restaurantId"
                                    :disableprop="order.status === 'cancel' || order.status === 'completed'"
                                />
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions class="q-pa-md">
                        <q-space />
                        <div class="text-h6 on-left">
                            <span style="color: #27a3c3">Total:</span>
                            $ {{order.total}}
                        </div>
                        <q-btn
                            v-if="order.status === 'review'"
                            class="on-right"
                            color="primary"
                            @click="cancelOrder(order)"
                        >Cancelar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <!-- <div class="row q-mb-lg">
            <div class="col flex flex-center">
                <q-pagination v-model="current" :max="5" :direction-links="true"></q-pagination>
            </div>
        </div>-->
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import moment from 'moment'
import OrderItemDetails from '@/components/general/OrderItemDetails'
import OrderProofOfPayment from '@/components/general/OrderProofOfPayments'

export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
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
            data: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            status: [
                {
                    text: 'review',
                    color: 'amber-9',
                    textEs: 'Por Revisar',
                },
                {
                    text: 'preparation',
                    color: 'yellow-9',
                    textEs: 'En preparacion',
                },
                {
                    text: 'onroute',
                    color: 'lime-8',
                    textEs: 'En camino',
                },
                {
                    text: 'delivered',
                    color: 'light-green-9',
                    textEs: 'Entregado',
                },
                {
                    text: 'completed',
                    color: 'secondary',
                    textEs: 'Completado',
                },
                {
                    text: 'cancel',
                    color: 'red-7',
                    textEs: 'Cancelada',
                },
            ],
        }
    },
    methods: {
        removeUnUsedItem(item) {
            let temp = Object.assign({}, item)
            delete temp.amount
            delete temp.price
            return temp
        },
        returnStatus(status) {
            return this.status.filter(st => {
                if (st.text === status) {
                    return st
                }
            })[0].textEs
        },
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY')
        },
        cancelOrder(order) {
            this.displayLoading = true
            let obj = order.logs
            api.changeOrderStatus({id: order.firebaseId, status: 'cancel'})
                .then(() => {
                    obj.push({
                        action: 'Cancel Order',
                        section: ``,
                        who: 'own user',
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: order.firebaseId,
                        Order: {logs: obj},
                    })
                })
                .then(response => {
                    order.status = 'cancel'
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha creado la casa cerveceras con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    async mounted() {
        this.displayLoading = true
        await api
            .returnAllOrdersFromUserId({id: this.uid})
            .then(response => {
                this.data = response.data.data
                this.data.sort((a, b) => {
                    return moment(b.logs[0]).diff(a.logs[0])
                })
            })
            .then(() => {
                this.displayLoading = false
            })
    },
    components: {
        'order-item-details': OrderItemDetails,
        'order-proof-of-payment': OrderProofOfPayment,
    },
}
</script>