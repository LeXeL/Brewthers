<template>
    <!-- <div><h1>brewery admin index</h1></div> -->
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div v-if="restaurants.length > 0">
            <div class="text-h5 q-mb-md text-white">
                Bienvenido, {{ `${user.brewingHouseName}` }}
            </div>
            <div class="row q-mb-lg">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-md">
                    <q-card flat dark class="full-width bg-grey-9">
                        <q-card-section>
                            <div class="text-h6">
                                <i class="fas fa-box-open text-amber-9"></i>
                                Ordenes abiertas
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-h3">
                                {{ returnFilteredOrdersByBreweryId().length }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-md">
                    <q-card flat dark class="full-width bg-grey-9">
                        <q-card-section>
                            <div class="text-h6">
                                <i class="fas fa-dolly text-info"></i> Ordenes
                                completas (mes)
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-h3">
                                {{
                                    returnFilteredOrderCompletedInAMonth()
                                        .length
                                }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-md">
                    <q-card flat dark class="full-width bg-grey-9">
                        <q-card-section>
                            <div class="text-h6">
                                <i
                                    class="fas fa-dollar-sign text-secondary"
                                ></i>
                                Vendido (mes)
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-h3">
                                $ {{ returnTotalInOrderCompletedInAMonth() }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-md">
                    <q-card flat dark class="full-width bg-grey-9">
                        <q-card-section>
                            <div class="text-h6">
                                <i class="fas fa-boxes text-lime-8"></i>
                                Unidades vendidas (mes)
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <div class="text-h3">
                                {{ returnTotalAmountSoldInAMonth() }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <q-card class="full-width" flat dark>
                        <q-item>
                            <q-item-section>
                                <div class="text-h6" size="xs">
                                    Ordenes recientes
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-list dark bordered>
                            <q-item
                                clickable
                                v-ripple
                                v-for="(
                                    order, i
                                ) in returnFilteredOrdersByBreweryId()"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>
                                        {{ returnRestaurantName(order) }}
                                    </q-item-label>
                                    <q-item-label caption
                                        >No. {{ order.id }}</q-item-label
                                    >
                                </q-item-section>
                                <q-item-section side style="font-size: 11px">
                                    {{
                                        returnTimeAgo(order.logs[0])
                                    }}</q-item-section
                                >
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <q-card class="full-width" flat dark>
                        <q-item>
                            <q-item-section>
                                <div class="text-h6" size="xs">
                                    Top restaurantes
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-list dark bordered>
                            <q-item
                                clickable
                                v-ripple
                                v-for="(user, i) in returnTopRestaurants()"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>{{
                                        returnRestaurantName(user)
                                    }}</q-item-label>
                                    <q-item-label caption>{{
                                        returnRestaurantEmail(user)
                                    }}</q-item-label>
                                </q-item-section>
                                <q-item-section side style="font-size: 11px">{{
                                    i + 1
                                }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <q-card class="full-width" flat dark>
                        <q-item>
                            <q-item-section>
                                <div class="text-h6" size="xs">
                                    Top cervezas
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-list dark bordered>
                            <q-item
                                clickable
                                v-ripple
                                v-for="(prod, i) in returnTopProducts()"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>{{
                                        prod.productName
                                    }}</q-item-label>
                                    <q-item-label caption>{{
                                        prod.type
                                    }}</q-item-label>
                                </q-item-section>
                                <q-item-section side style="font-size: 11px">{{
                                    prod.amount
                                }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
export default {
    data() {
        return {
            data: [],
            restaurants: [],
            users: [],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        returnTopRestaurants() {
            let topRestaurants = []
            let RestaurantsAdded = []
            let allOrders = this.data.filter(order => order.status !== 'cancel')
            let completeOrders = this.productsInOrders(allOrders)
            completeOrders.forEach(order => {
                if (!RestaurantsAdded.includes(order.restaurantId)) {
                    topRestaurants.push({
                        restaurantName: order.restaurantId,
                        restaurantId: order.restaurantId,
                        amount: 1,
                    })
                    RestaurantsAdded.push(order.restaurantId)
                } else {
                    let value = topRestaurants.find(
                        rest => rest.restaurantName === order.restaurantId
                    )
                    value.amount += 1
                }
            })
            return topRestaurants.sort((a, b) => b.amount - a.amount)
        },
        returnTopProducts() {
            let topProducts = []
            let ProductsAdded = []
            let allOrders = this.data.filter(order => order.status !== 'cancel')
            let completeOrders = this.productsInOrders(allOrders)
            completeOrders.forEach(order => {
                order.cart.forEach(product => {
                    if (!ProductsAdded.includes(product.id)) {
                        topProducts.push({
                            productName: product.name,
                            productId: product.id,
                            type: product.type,
                            amount: 1,
                        })
                        ProductsAdded.push(order.restaurantId)
                    } else {
                        let value = topProducts.find(
                            prod => prod.productId === product.id
                        )
                        value.amount += 1
                    }
                })
            })
            return topProducts.sort((a, b) => b.amount - a.amount)
        },
        productsInOrders(allOrders) {
            let completeOrders = []
            let itemsAlreadyAdded = []
            allOrders.forEach(order => {
                order.cart.forEach(product => {
                    if (
                        product.brewery === this.user.breweryId &&
                        !itemsAlreadyAdded.includes(order.id)
                    ) {
                        itemsAlreadyAdded.push(order.id)
                        completeOrders.push(order)
                    }
                })
            })
            return completeOrders
        },
        returnTotalAmountSoldInAMonth() {
            let orders = this.returnFilteredOrderCompletedInAMonth()
            let total = 0
            orders.forEach(order => {
                order.cart.forEach(product => {
                    if (product.brewery === this.user.breweryId)
                        total += product.inventory
                })
            })
            return parseInt(total)
        },
        returnTotalInOrderCompletedInAMonth() {
            let orders = this.returnFilteredOrderCompletedInAMonth()
            let total = 0
            orders.forEach(order => {
                order.cart.forEach(product => {
                    if (product.brewery === this.user.breweryId)
                        total += product.price
                })
            })
            return parseFloat(total).toFixed(2)
        },
        returnTimeAgo(time) {
            return moment(time).fromNow()
        },
        returnFilteredOrderCompletedInAMonth() {
            let allOrders = this.data.filter(order => order.status !== 'cancel')
            let completeOrders = this.productsInOrders(allOrders)
            return completeOrders.filter(order =>
                moment(order.logs[0]).isSame(new Date(), 'month')
            )
        },
        returnFilteredOrdersByBreweryId() {
            let allOrders = this.data.filter(
                order =>
                    order.status !== 'cancel' && order.status !== 'completed'
            )
            return this.productsInOrders(allOrders)
        },
        returnRestaurantName(order) {
            let value = this.restaurants.find(
                res => res.id === order.restaurantId
            )
            return !!value ? value.restaurantName : 'Nan'
        },
        returnRestaurantEmail(order) {
            let value = this.restaurants.find(
                res => res.id === order.restaurantId
            )
            return !!value ? value.email : 'Nan'
        },

        addToData(id, data) {
            data.firebaseId = id
            this.data.push(data)
            this.data.sort((a, b) => {
                return parseInt(b.id) - parseInt(a.id)
            })
        },
        editData(id, data) {
            data.firebaseId = id
            this.data.forEach((d, index) => {
                if (d.firebaseId === id) {
                    this.data.splice(index, 1, data)
                }
            })
            this.data.sort((a, b) => {
                return parseInt(b.id) - parseInt(a.id)
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.firebaseId === id) {
                    this.data.splice(index, 1)
                }
            })
            this.data.sort((a, b) => {
                return parseInt(b.id) - parseInt(a.id)
            })
        },
    },
    async mounted() {
        this.displayLoading = true
        let db = firebase.firestore()
        db.collection('order').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeData(change.doc.id)
                    }
                })
            },
            error => {
                console.log(error)
            }
        )
        api.returnApprovedUser()
            .then(response => {
                response.data.data.forEach(element => {
                    this.restaurants.push(element)
                })
            })
            .then(() => (this.displayLoading = false))
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
