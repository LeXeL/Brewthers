<template>
    <div class="q-pa-md" v-if="Object.keys(data).length !== 0">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="text-h5 q-mb-md">Orden No. {{data.id}}</div>

        <div class="row">
            <div class="col-lg-8 col-xs-12">
                <div class="row">
                    <div class="col">
                        <div class="text-h6 q-px-md">Control de estados</div>
                        <order-stepper :orderId="this.$route.params.id" :data="data" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12 q-pa-md">
                        <div class="text-h6 q-mb-sm">Datos de orden</div>
                        <order-info
                            v-if="restaurants.length > 0"
                            :data="restaurants.filter(rest => { if(rest.id === data.restaurantId) return rest})"
                            :date="data.logs[0]"
                        />
                    </div>
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Detalle de pago</div>
                        <order-amounts :data="data" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12 q-pa-md">
                        <div class="text-h6 q-mb-sm">Entrega</div>
                        <order-address
                            v-if="restaurants.length > 0"
                            :data="restaurants.filter(rest => { if(rest.id === data.restaurantId) return rest})"
                        />
                    </div>
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Comprobantes de pago</div>
                        <order-proof-of-payments
                            :data="data.paymentProof"
                            :fullOrder="data"
                            :orderId="this.$route.params.id"
                            :restaurantId="this.data.restaurantId"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-sm-6 col-xs-12 col-sm-6 q-pa-md">
                        <div class="text-h6 q-mb-sm">Log de orden</div>
                        <order-log :data="data.logs" />
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 col-xs-12">
                <order-item-details
                    :data="item"
                    v-for="(item, i) in removeElementsFromObject(data.cart)"
                    :key="i"
                />
            </div>
        </div>
        <div class="row">
            <div class="col q-pa-md"></div>
            <div class="col q-pa-md"></div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'

import OrderStepper from '@/components/admin/OrderStepper'
import OrderInfo from '@/components/admin/OrderInfo'
import OrderAmounts from '@/components/admin/OrderAmounts'
import OrderItemDetails from '@/components/general/OrderItemDetails'
import OrderAddress from '@/components/admin/OrderAddress'
import OrderProofOfPayments from '@/components/general/OrderProofOfPayments'
import OrderLog from '@/components/admin/OrderLog'

export default {
    data() {
        return {
            data: '',
            restaurants: [],
            addInventory: '',
            substractInventory: '',
            editInformation: false,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        removeElementsFromObject(cart) {
            cart.forEach(element => {
                delete element.style
                delete element.ibu
                delete element.abv
            })
            return cart
        },
    },
    async mounted() {
        this.displayLoading = true
        api.returnOrderById({id: this.$route.params.id})
            .then(product => {
                this.data = product.data.data
                api.returnApprovedUser().then(response => {
                    response.data.data.forEach(element => {
                        this.restaurants.push(element)
                    })
                })
            })
            .then(() => {
                this.displayLoading = false
            })
            .catch(error => {
                console.log(error)
            })
        // await this.getOrderInformation()
        // await this.getRestaurantInfo()
    },
    components: {
        'order-stepper': OrderStepper,
        'order-info': OrderInfo,
        'order-amounts': OrderAmounts,
        'order-item-details': OrderItemDetails,
        'order-address': OrderAddress,
        'order-proof-of-payments': OrderProofOfPayments,
        'order-log': OrderLog,
    },
}
</script>
