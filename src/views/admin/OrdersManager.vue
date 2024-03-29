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
        <div class="text-h5 q-mb-md text-white">Administrador de ordernes</div>
        <div class="row">
            <q-space class="desktop-only" />
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-select
                    filled
                    v-model="filteredStatus"
                    :options="
                        status.map(st => {
                            return st.textEs
                        })
                    "
                    label="Estatus"
                    dark
                    dense
                />
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-input
                    filled
                    label="No. de Orden"
                    dark
                    dense
                    v-model="filteredOrderNumber"
                />
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-input
                    filled
                    label="Restaurante"
                    dark
                    dense
                    v-model="filteredRestaurantName"
                />
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-input
                    filled
                    mask="date"
                    label="Fecha inicial"
                    v-model="dateToday"
                    dark
                    dense
                >
                    <template v-slot:append>
                        <i class="far fa-calendar-alt cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxyd"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="dateToday"
                                    @input="() => $refs.qDateProxyd.hide()"
                                    dark
                                />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-input
                    filled
                    mask="date"
                    label="Fecha final"
                    dark
                    dense
                    v-model="dateTomorow"
                >
                    <template v-slot:append>
                        <i class="far fa-calendar-alt cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="dateTomorow"
                                    @input="() => $refs.qDateProxy.hide()"
                                    dark
                                />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-1 col-md-1 q-pa-md">
                <q-btn
                    class="full-height"
                    color="primary"
                    label="Buscar"
                    @click="filterContent()"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12 q-pa-md">
                <q-table
                    title="Ordenes existentes"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :pagination.sync="initialPagination"
                    binary-state-sort
                    dark
                    v-if="restaurants.length > 0"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="orderNo" :props="props">
                                {{ props.row.id }}
                            </q-td>
                            <q-td key="restName" :props="props">
                                {{ returnRestaurantName(props.row) }}
                            </q-td>
                            <q-td key="email" :props="props">
                                {{ returnRestaurantEmail(props.row) }}
                            </q-td>
                            <q-td key="phone" :props="props">
                                {{ returnRestaurantContactPhone(props.row) }}
                            </q-td>
                            <q-td key="amount" :props="props">
                                {{ props.row.amount }}
                            </q-td>
                            <q-td key="total" :props="props"
                                >$ {{ props.row.total.toFixed(2) }}</q-td
                            >
                            <q-td key="paymentMethod" :props="props">
                                {{ props.row.paymentMethod }}
                            </q-td>
                            <q-td key="date" :props="props">
                                {{ returnTime(props.row.logs[0]) }}
                            </q-td>

                            <q-td>
                                <q-badge
                                    :color="
                                        status.filter(st => {
                                            if (st.text === props.row.status)
                                                return st
                                        })[0].color
                                    "
                                    size="xs"
                                    :label="
                                        status.filter(st => {
                                            if (st.text === props.row.status)
                                                return st
                                        })[0].textEs
                                    "
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="info"
                                    size="xs"
                                    label="Detalles"
                                    :to="`/order-details/${props.row.firebaseId}`"
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="green-7"
                                    size="xs"
                                    label="Desglose"
                                    @click="returnSellXlsxDetails(props.row)"
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="red-7"
                                    size="xs"
                                    label="Cancelar"
                                    @click="asingWorkingorder(props.row)"
                                    :disable="
                                        props.row.status == 'cancel' ||
                                        props.row.status === 'completed'
                                    "
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog v-model="alert">
            <q-card style="width: 700px; max-width: 80vw" dark>
                <q-card-section>
                    <div class="text-h6">
                        Seleccione los motivos de cancelacion de orden
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-option-group
                        :options="cancelationReasons"
                        label="Notifications"
                        type="checkbox"
                        v-model="group"
                        dark
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn label="Cancelar" color="red-7" v-close-popup />
                    <q-btn
                        label="Confirmar"
                        color="secondary"
                        @click="cancelOrder"
                        v-close-popup
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
import xlsx from 'xlsx'
export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 50,
                // rowsNumber: xx if getting data from a server
            },
            dateToday: moment(new Date()).format('YYYY/MM/DD'),
            dateTomorow: moment(new Date()).format('YYYY/MM/DD'),
            alert: false,
            filteredStatus: '',
            filteredOrderNumber: '',
            filteredRestaurantName: '',
            group: [],
            cancelationReasons: [
                {
                    label: 'Por solicitud del usuario',
                    value: 'Por solicitud del usuario',
                },
                {
                    label: 'Pago rebotado',
                    value: 'Pago rebotado',
                },
            ],
            columns: [
                {
                    name: 'orderNo',
                    required: true,
                    label: 'No. de Orden',
                    align: 'left',
                    field: 'orderNo',
                    sortable: true,
                },
                {
                    name: 'restName',
                    required: true,
                    label: 'Restaurante',
                    align: 'left',
                    field: 'restName',
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
                },
                {
                    name: 'phone',
                    align: 'left',
                    label: 'Celular',
                    field: 'phone',
                },
                {
                    name: 'amount',
                    align: 'left',
                    label: 'Articulos',
                    field: 'amount',
                    sortable: true,
                },
                {
                    name: 'total',
                    align: 'left',
                    label: 'Total',
                    field: 'total',
                    sortable: true,
                },
                {
                    name: 'paymentMethod',
                    align: 'left',
                    label: 'Metodo de pago',
                    field: 'paymentMethod',
                    sortable: true,
                },
                {
                    name: 'date',
                    align: 'left',
                    label: 'Fecha',
                    field: 'date',
                    sortable: true,
                },
                {
                    name: 'status',
                    align: 'left',
                    label: 'Estatus',
                    field: 'status',
                    sortable: true,
                },
                {
                    label: 'Detalles',
                    align: 'left',
                },
                {
                    label: 'Desglose',
                    align: 'left',
                },
                {
                    label: 'Cancelar',
                    align: 'left',
                },
            ],
            data: [],
            status: [
                {textEs: 'Todos'},
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
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            workingOrder: '',
            restaurants: [],
            completeData: [],
        }
    },
    methods: {
        resolveBreweryId(id) {
            return (
                this.brewerys.find(brewery => brewery.id === id).name || 'N/A'
            )
        },
        async returnSellXlsxDetails(order) {
            let finalObject = []
            let temp = []
            let breweryAdded = {}
            for await (const item of order.cart) {
                if (!Object.keys(breweryAdded).includes(item.brewery)) {
                    let breweryName = await this.resolveBreweryId(item.brewery)
                    breweryAdded[item.brewery] = breweryName
                    let obj = {}
                    obj[`${breweryName}`] = parseFloat(item.price * item.amount)
                    temp.push(obj)
                    continue
                }
                temp[`${breweryAdded[item.brewery]}`] += parseFloat(
                    item.price * item.amount
                )
            }
            temp.forEach(brewery => {
                let Venta = Object.values(brewery)[0]
                let Itbms = Venta * 0.1
                let Comision_Brewthers = Venta * 0.2
                let Itbms_Brewthers = Comision_Brewthers * 0.07
                let obj = {
                    Nombre: Object.keys(brewery)[0],
                    Venta,
                    Itbms,
                    Comision_Brewthers,
                    Itbms_Brewthers,
                    Entregar_a_casa:
                        Venta + Itbms - Comision_Brewthers - Itbms_Brewthers,
                    Entregar_a_brewthers: Comision_Brewthers + Itbms_Brewthers,
                }
                finalObject.push(obj)
            })
            let wb = xlsx.utils.book_new()
            let ws = xlsx.utils.json_to_sheet(finalObject)
            xlsx.utils.book_append_sheet(wb, ws, `${order.id}`)
            xlsx.writeFile(wb, `Orden ${order.id}.xlsx`)
        },
        returnRestaurantName(order) {
            let value = this.restaurants.filter(res => {
                if (res.id === order.restaurantId) return res
            })

            if (value.length > 0) return value[0].restaurantName
            return 'NaN'
        },
        returnRestaurantEmail(order) {
            let value = this.restaurants.filter(res => {
                if (res.id === order.restaurantId) return res
            })

            if (value.length > 0) return value[0].email
            return 'NaN'
        },
        returnRestaurantContactPhone(order) {
            let value = this.restaurants.filter(res => {
                if (res.id === order.restaurantId) return res
            })

            if (value.length > 0) return value[0].contactPhone
            return 'NaN'
        },
        filterContent() {
            this.data = this.completeData
            if (this.filteredStatus) {
                if (this.filteredStatus === 'Todos') {
                    this.data = this.completeData
                    this.clear()
                    return
                }
                let status = this.status.filter(sta => {
                    if (sta.textEs === this.filteredStatus) return sta
                })
                this.data = this.data.filter(data => {
                    if (data.status === status[0].text) {
                        return data
                    }
                })
            }
            if (this.filteredOrderNumber) {
                this.data = this.data.filter(data => {
                    if (data.id === parseInt(this.filteredOrderNumber)) {
                        return data
                    }
                })
            }
            if (this.filteredRestaurantName) {
                let restaurantsName = this.restaurants.filter(res => {
                    return res.restaurantName
                        .toLowerCase()
                        .includes(this.filteredRestaurantName.toLowerCase())
                })
                this.data = this.data.filter(data => {
                    if (data.restaurantId === restaurantsName[0].id) {
                        return data
                    }
                })
            }
            if (
                this.dateToday != moment(new Date()).format('YYYY/MM/DD') ||
                this.dateTomorow != moment(new Date()).format('YYYY/MM/DD')
            ) {
                this.data = this.data.filter(data => {
                    let dataDate = moment(data.logs[0]).format('YYYY/MM/DD')
                    if (
                        moment(dataDate).isSameOrAfter(this.dateToday) &&
                        moment(dataDate).isSameOrBefore(this.dateTomorow)
                    ) {
                        return data
                    }
                })
            }
            this.clear()
        },
        asingWorkingorder(order) {
            this.workingOrder = order
            this.alert = true
        },
        clear() {
            this.filteredStatus = ''
            this.filteredOrderNumber = ''
            this.filteredRestaurantName = ''
            this.dateToday = moment(new Date()).format('YYYY/MM/DD')
            this.dateTomorow = moment(new Date()).format('YYYY/MM/DD')
        },
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY')
        },
        addToData(id, data) {
            data.firebaseId = id
            this.completeData.push(data)
            data.amount = parseInt(data.amount)
            data.total = parseFloat(data.total)
            this.data.push(data)
            this.data.sort((a, b) => {
                return moment(b.logs[0]).diff(a.logs[0])
            })
        },
        editData(id, data) {
            data.firebaseId = id
            data.amount = parseInt(data.amount)
            data.total = parseFloat(data.total)
            this.data.forEach((d, index) => {
                if (d.firebaseId === id) {
                    this.completeData.splice(index, 1, data)
                    this.data.splice(index, 1, data)
                }
            })
            this.data.sort((a, b) => {
                return moment(b.logs[0]).diff(a.logs[0])
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.firebaseId === id) {
                    this.completeData.splice(index, 1)
                    this.data.splice(index, 1)
                }
            })
            this.data.sort((a, b) => {
                return moment(b.logs[0]).diff(a.logs[0])
            })
        },
        cancelOrder() {
            this.displayLoading = true
            let obj = this.workingOrder.logs
            api.changeOrderStatus({
                id: this.workingOrder.firebaseId,
                status: 'cancel',
            })
                .then(() => {
                    let reasons = []
                    this.group.forEach(reason => {
                        this.cancelationReasons.forEach(option => {
                            if (option.value === reason)
                                reasons.push(option.label)
                        })
                    })
                    obj.push({
                        action: 'Cancel Order',
                        section: reasons,
                        who: this.user.email,
                        time: Date.now(),
                    })
                    api.updateOrdersInformation({
                        id: this.workingOrder.firebaseId,
                        Order: {logs: obj},
                    })
                })
                .then(response => {
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
