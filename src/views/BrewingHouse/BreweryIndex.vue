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
        <div v-if="Object.keys(users).length !== 0 && restaurants.length > 0">
            <div class="text-h5 q-mb-md text-white">
                Bienvenido, {{ `${user.name} ${user.lastName}` }}
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
                                2
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
                                3
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
                                $ 25.36
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
                                1
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
                                v-for="(order, i) in 5"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>
                                        Nombre del rest
                                    </q-item-label>
                                    <q-item-label caption
                                        >No. 1234</q-item-label
                                    >
                                </q-item-section>
                                <q-item-section side style="font-size: 11px">
                                    5 mins atras</q-item-section
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
                                v-for="(user, i) in 5"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>Restaurant name</q-item-label>
                                    <q-item-label caption
                                        >restaurantemail@gmail.com</q-item-label
                                    >
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
                                v-for="(user, i) in 5"
                                :key="i"
                            >
                                <q-item-section>
                                    <q-item-label>Beer name</q-item-label>
                                    <q-item-label caption>KEG</q-item-label>
                                </q-item-section>
                                <q-item-section side style="font-size: 11px">{{
                                    i + 1
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
        returnTotalInOrderCompletedInAMonth() {
            let orders = this.returnFilteredOrderCompletedInAMonth()
            let total = 0
            orders.forEach(order => {
                total += parseFloat(order.total)
            })
            return parseFloat(total).toFixed(2)
        },
        returnTimeAgo(time) {
            return moment(time).fromNow()
        },
        returnFilteredOrderCompletedInAMonth() {
            return this.data.filter(order => {
                if (
                    order.status === 'completed' &&
                    moment(order.logs[0]).isSame(new Date(), 'month')
                ) {
                    return order
                }
            })
        },
        returnFilteredOrders() {
            return this.data.filter(order => {
                if (order.status !== 'cancel' && order.status !== 'completed') {
                    return order
                }
            })
        },
        returnFilteredUsers() {
            return this.users.filter(user => user.status === 'pending')
        },
        returnRestaurantName(order) {
            let value = this.restaurants.filter(res => {
                if (res.id === order.restaurantId) return res
            })

            if (value.length > 0) return value[0].restaurantName
            return 'NaN'
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
        addToUsers(id, data) {
            let name = data.name + ' ' + data.lastName
            data.name = name
            data.id = id
            this.users.push(data)
        },
        editInUsers(id, data) {
            let name = data.name + ' ' + data.lastName
            data.name = name
            data.id = id
            this.users.forEach((user, index) => {
                if (user.id === id) {
                    this.users.splice(index, 1, data)
                }
            })
        },
        removeInUsers(id) {
            this.users.forEach((user, index) => {
                if (user.id === id) {
                    this.users.splice(index, 1)
                }
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
        db.collection('users').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editInUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeInUsers(change.doc.id)
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
