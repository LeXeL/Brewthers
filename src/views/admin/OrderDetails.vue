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
                            <div class="text-h6 q-px-md">Control de estados</div>
                            <order-stepper :orderId="this.$route.params.id" :data="data" />
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
                            <div class="text-h6 q-mb-sm">Comprobantes de pago</div>
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
                        @remove="removeFromCartInOrder"
                        @addAmountToItemInCart="addAmountToItem"
                        @subtractAmountToItemInCart="subtractAmountToItem"
                        :key="i"
                        :disableprop="data.status !== 'review'"
                    />
                    <div class="q-px-md">
                        <q-btn
                            :disable="data.status !== 'review'"
                            color="info"
                            text-color="black"
                            label="Agregar articulos"
                            @click="openModal"
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
                                <q-item-section class="text-grey">No hay resultados.</q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section v-if="Object.keys(selectedItemFromInput).length !== 0">
                    <div class="row">
                        <div class="col-4">
                            <q-img :src="selectedItemFromInput.photoLocation" />
                        </div>
                        <div class="col-8 q-px-md">
                            <div class="text-h6">{{selectedItemFromInput.name}}</div>
                            <p class="q-mb-none">Casa: {{selectedItemFromInput.brewery}}</p>
                            <p class="q-mb-none">Presentacion: {{selectedItemFromInput.type}}</p>
                            <p class="q-mb-none">Precio: $ {{selectedItemFromInput.price}}</p>
                            <p class="q-mb-none">Inventario: {{selectedItemFromInput.inventory}}</p>
                            <q-btn-group class="q-mb-sm q-mt-sm">
                                <q-btn
                                    color="primary"
                                    size="xs"
                                    :disable="amount == 0 ? true : false"
                                    @click="subtractAmount"
                                >
                                    <i class="fas fa-minus"></i>
                                </q-btn>
                                <q-btn color="primary" disable>{{this.amount}}</q-btn>
                                <q-btn color="primary" size="xs" @click="addAmount">
                                    <i class="fas fa-plus"></i>
                                </q-btn>
                            </q-btn-group>
                            <br />
                            <q-btn
                                color="primary q-mb-md"
                                @click="addToCart"
                                :disabled="!amount"
                            >Agregar</q-btn>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
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
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            addItems: false,
            model: null,
            options: [],
            product: '',
            completeBreweryWithProducts: [],
            selectInputOptions: [],
            selectedItemFromInput: {},
            amount: 0,
        }
    },
    watch: {
        model(newValue, oldValue) {
            //sacar la info del elemento seleccionado.
            if (newValue) {
                let selectedItem = newValue.split(' - ')
                let breweryItem = this.completeBreweryWithProducts.filter(
                    brewery => {
                        if (brewery.name === selectedItem[1]) return brewery
                    }
                )
                let productItem = breweryItem[0].products.filter(product => {
                    if (
                        product.name === selectedItem[0] &&
                        product.type === selectedItem[2]
                    )
                        return product
                })
                this.product = productItem[0]
                productItem[0].brewery = breweryItem[0].name
                this.selectedItemFromInput = productItem[0]
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        addAmountToItem(event) {
            this.displayLoading = true
            let itemIndex = 0
            this.data.cart.forEach((element, index) => {
                if (element.id === event.item.id) {
                    itemIndex = index
                }
            })
            if (parseInt(event.amount + 1) <= parseInt(event.item.inventory)) {
                event.item.amount += 1
                api.updateShoppingCartInOrder({
                    uid: this.$route.params.id,
                    product: event.item,
                    itemIndex: itemIndex,
                }).then(() => {
                    this.reCalculateOrderTotalAndAmount()
                    let obj = this.data.logs
                    obj.push({
                        action: 'Item Modified',
                        section: `Producto: ${event.item.name} => (${event.item.amount}) `,
                        who: this.user.email,
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: this.$route.params.id,
                        Order: {logs: obj},
                    })
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
            } else {
                this.alertTitle = 'Hey AWANTA!'
                this.alertMessage =
                    'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
        subtractAmountToItem(event) {
            this.displayLoading = true
            let itemIndex = 0
            this.data.cart.forEach((element, index) => {
                if (element.id === event.item.id) {
                    itemIndex = index
                }
            })

            if (parseInt(event.amount - 1) > 0) {
                event.item.amount -= 1
                api.updateShoppingCartInOrder({
                    uid: this.$route.params.id,
                    product: event.item,
                    itemIndex: itemIndex,
                }).then(() => {
                    this.reCalculateOrderTotalAndAmount()
                    let obj = this.data.logs
                    obj.push({
                        action: 'Item Modified',
                        section: `Producto: ${event.item.name} => (${event.item.amount}) `,
                        who: this.user.email,
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: this.$route.params.id,
                        Order: {logs: obj},
                    })
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
            } else {
                this.alertTitle = 'Hey AWANTA!'
                this.alertMessage =
                    'No podemos dejar el item en 0 mejor eliminalo!'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
        reCalculateOrderTotalAndAmount() {
            let total = 0
            let amount = 0
            this.data.cart.forEach(order => {
                total += parseFloat(order.price) * order.amount
                amount += order.amount
            })
            this.data.total = total + this.data.itbms
            this.data.amount = amount
        },
        removeFromCartInOrder(event) {
            this.displayLoading = true
            api.removeFromShoppingCartInOrder({
                uid: this.$route.params.id,
                product: event,
            })
                .then(response => {
                    this.data.cart.forEach((d, index) => {
                        if (d.id === event.id) {
                            this.data.cart.splice(index, 1)
                        }
                    })
                    this.reCalculateOrderTotalAndAmount()
                    let obj = this.data.logs
                    obj.push({
                        action: 'Item Deleted',
                        section: `Producto: ${event.name} (${event.amount}) x ${event.price}`,
                        who: this.user.email,
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: this.$route.params.id,
                        Order: {logs: obj},
                    })
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        addToCart() {
            this.displayLoading = true
            this.product.amount = this.amount
            api.addToShoppingCartInOrder({
                uid: this.$route.params.id,
                product: this.product,
            })
                .then(response => {
                    this.data.cart.push(this.product)
                    this.reCalculateOrderTotalAndAmount()
                    let obj = this.data.logs
                    obj.push({
                        action: 'Item Added',
                        section: `Producto: ${this.product.name} (${this.product.amount}) x ${this.product.price}`,
                        who: this.user.email,
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: this.$route.params.id,
                        Order: {logs: obj},
                    })
                    this.addItems = false
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
            this.amount = 0
        },
        addAmount() {
            this.displayAlert = false
            if (this.amount < this.product.inventory) {
                return this.amount++
            }
            this.alertTitle = 'Hey AWANTA!'
            this.alertMessage =
                'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
            this.alertType = 'error'
            this.displayAlert = true
        },
        subtractAmount() {
            if (this.amount > 0) {
                return this.amount--
            }
        },
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
                this.options = this.selectInputOptions.filter(
                    v => v.toLowerCase().indexOf(needle) > -1
                )
            })
        },
        async openModal() {
            this.displayLoading = true
            this.selectInputOptions = []
            this.completeBreweryWithProducts = []
            this.model = null
            this.amount = 0
            this.selectedItemFromInput = {}
            api.returnAllBrewerys()
                .then(response => {
                    return response.data.data
                })
                .then(async data => {
                    let products = await api.returnAllProducts()
                    products = products.data.data
                    data.forEach(brewery => {
                        let productsOnBrewery = products.filter(product => {
                            if (
                                product.brewery === brewery.id &&
                                product.inventory > 0
                            ) {
                                return product
                            }
                        })
                        if (productsOnBrewery.length > 0) {
                            brewery.products = productsOnBrewery
                            this.completeBreweryWithProducts.push(brewery)
                        }
                    })
                })
                .then(() => {
                    this.addItems = true
                    this.displayLoading = false
                    this.completeBreweryWithProducts.map(brewery => {
                        brewery.products.forEach(product => {
                            this.selectInputOptions.push(
                                `${product.name} - ${brewery.name} - ${product.type}`
                            )
                        })
                    })
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
