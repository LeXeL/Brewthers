<template>
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div v-if="Object.keys(data).length !== 0">
            <div class="text-h5 q-mb-md">Orden No. {{ data.id }}</div>

            <div class="row">
                <div class="col-lg-8 col-xs-12">
                    <div class="row">
                        <div class="col">
                            <div class="text-h6 q-px-md">
                                Control de estados
                            </div>
                            <order-stepper
                                :orderId="this.$route.params.id"
                                :data="data"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-xs-12 q-pa-md">
                            <div class="text-h6 q-mb-sm">Datos de orden</div>
                            <order-info
                                v-if="restaurants.length > 0"
                                :data="
                                    restaurants.filter(rest => {
                                        if (rest.id === data.restaurantId)
                                            return rest
                                    })
                                "
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
                                :data="
                                    restaurants.filter(rest => {
                                        if (rest.id === data.restaurantId)
                                            return rest
                                    })
                                "
                            />
                        </div>
                        <div class="col q-pa-md">
                            <div class="text-h6 q-mb-sm">
                                Comprobantes de pago
                            </div>
                            <order-proof-of-payments
                                :data="data.paymentProof"
                                :fullOrder="data"
                                :orderId="this.$route.params.id"
                                :restaurantId="this.data.restaurantId"
                                :disableprop="
                                    this.data.status === 'cancel' ||
                                        this.data.status === 'completed'
                                "
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div
                            class="col-lg-6 col-sm-6 col-xs-12 col-sm-6 q-pa-md"
                        >
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
                    <div class="q-px-md">
                        <q-btn
                            color="info"
                            text-color="black"
                            label="Agregar articulos"
                            @click="addItems = true"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col q-pa-md"></div>
                <div class="col q-pa-md"></div>
                <div class="col"></div>
            </div>
        </div>
        <q-dialog v-model="addItems">
            <q-card dark style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <q-space />
                    <q-btn flat round dense v-close-popup>
                        <i class="fas fa-times"></i>
                    </q-btn>
                </q-card-section>
                <q-card-section>
                    <q-select
                        filled
                        v-model="model"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        label="Cerveza o casa cervecera"
                        dark
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    No hay resultados.
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col-4">
                            <q-img :src="require('@/assets/beer.jpg')" />
                        </div>
                        <div class="col-8 q-px-md">
                            <div class="text-h6">Nombre de la pinta</div>
                            <p class="q-mb-none">Casa: Nombre de la casa</p>
                            <p class="q-mb-none">Presentacion: KEG</p>
                            <p class="q-mb-none">Precio: $ 12.50</p>
                            <p class="q-mb-none">Inventario: 10</p>
                            <q-btn-group class="q-mb-sm q-mt-sm">
                                <q-btn color="primary" size="xs">
                                    <i class="fas fa-minus"></i>
                                </q-btn>
                                <q-btn color="primary" disable>0</q-btn>
                                <q-btn color="primary" size="xs">
                                    <i class="fas fa-plus"></i>
                                </q-btn>
                            </q-btn-group>
                            <br />
                            <q-btn color="primary q-mb-md">Agregar</q-btn>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

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
            addItems: false,
            model: null,
            options: stringOptions,
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
        filterFn(val, update, abort) {
            update(() => {
                const needle = val.toLowerCase()
                this.options = stringOptions.filter(
                    v => v.toLowerCase().indexOf(needle) > -1
                )
            })
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
