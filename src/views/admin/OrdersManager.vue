<template>
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @cancel="displayConfirm = false"
        ></confirm-dialog>
        <div class="text-h5 q-mb-md">Administrador de ordernes</div>
        <div class="row">
            <q-space class="desktop-only" />
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-select
                    filled
                    v-model="filteredStatus"
                    :options="status.map(st=>{return st.textEs})"
                    label="Estatus"
                    dark
                    dense
                />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled label="No. de Orden" dark dense v-model="filteredOrderNumber" />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled label="Restaurante" dark dense v-model="filteredRestaurantName" />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled mask="date" label="Fecha inicial" v-model="dateToday" dark dense>
                    <template v-slot:append>
                        <i class="far fa-calendar-alt cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="dateToday"
                                    @input="() => $refs.qDateProxy.hide()"
                                    dark
                                />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled mask="date" label="Fecha final" dark dense v-model="dateTomorow">
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
            <div class="col-lg-1 q-pa-md">
                <q-btn class="full-height" color="primary" label="Buscar" @click="filterContent()" />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12 q-pa-md">
                <q-table
                    title="Ordenes existentes"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :pagination="{rowsPerPage: 15}"
                    binary-state-sort
                    dark
                    v-if="restaurants.length > 0"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="orderNo" :props="props">
                                {{
                                props.row.id
                                }}
                            </q-td>
                            <q-td key="restName" :props="props">
                                {{
                                restaurants.filter(res => { if(res.id === props.row.restaurantId) return res} )[0].restaurantName
                                }}
                            </q-td>
                            <q-td key="email" :props="props">
                                {{
                                restaurants.filter(res => { if(res.id === props.row.restaurantId) return res} )[0].email
                                }}
                            </q-td>
                            <q-td key="phone" :props="props">
                                {{
                                restaurants.filter(res => { if(res.id === props.row.restaurantId) return res} )[0].contactPhone
                                }}
                            </q-td>
                            <q-td key="items" :props="props">
                                {{
                                props.row.amount
                                }}
                            </q-td>
                            <q-td key="amount" :props="props">$ {{ props.row.total }}</q-td>
                            <q-td key="paymentMethod" :props="props">
                                {{
                                props.row.paymentMethod
                                }}
                            </q-td>
                            <q-td key="date" :props="props">
                                {{
                                returnTime(props.row.logs[0])
                                }}
                            </q-td>

                            <q-td>
                                <q-badge
                                    :color="status.filter(st =>{ if(st.text === props.row.status) return st})[0].color"
                                    size="xs"
                                    :label="status.filter(st =>{ if(st.text === props.row.status) return st})[0].textEs"
                                />
                            </q-td>
                            <q-td>
                                <q-btn color="info" size="xs" label="Detalles" to="/order-details" />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="red-7"
                                    size="xs"
                                    label="Cancelar"
                                    @click="alert = true"
                                    :disable="props.row.status == 5"
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
        <q-dialog v-model="alert">
            <q-card style="width: 700px; max-width: 80vw;" dark>
                <q-card-section>
                    <div class="text-h6">Seleccione los motivos de cancelacion de orden</div>
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
                    <q-btn label="Confirmar" color="secondary" v-close-popup />
                    <q-btn label="Cancelar" color="red-7" v-close-popup />
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
export default {
    data() {
        return {
            dateToday: moment(new Date()).format('YYYY/MM/DD'),
            dateTomorow: moment(new Date()).format('YYYY/MM/DD'),
            alert: false,
            filteredStatus: '',
            filteredOrderNumber: '',
            filteredRestaurantName: '',
            group: [],
            cancelationReasons: [
                {label: 'This is cancelation reason 1', value: 'bat'},
                {label: 'This is cancelation reason 2', value: 'friend'},
                {label: 'This is cancelation reason 3', value: 'upload'},
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
                    sortable: true,
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
                    sortable: true,
                },
                {
                    name: 'phone',
                    align: 'left',
                    label: 'Celular',
                    field: 'phone',
                    sortable: true,
                },
                {
                    name: 'items',
                    align: 'left',
                    label: 'Articulos',
                    field: 'items',
                    sortable: true,
                },
                {
                    name: 'amount',
                    align: 'left',
                    label: 'Total',
                    field: 'amount',
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
                    label: 'Cancelar',
                    align: 'left',
                },
            ],
            data: [],
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
                {textEs: 'Todos'},
            ],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            workingDeletedId: '',
            restaurants: [],
            completeData: [],
        }
    },
    methods: {
        filterContent() {
            this.data = this.completeData
            if (this.filteredStatus) {
                if (this.filteredStatus === 'Todos') {
                    this.data = this.completeData
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
                console.log('entra')
                this.data = this.data.filter(data => {
                    if (
                        moment(data.logs[0]).isAfter(
                            moment(this.dateToday).format('YYYY/MM/DD')
                        ) &&
                        moment(data.logs[0]).isBefore(
                            moment(this.dateTomorow).format('YYYY/MM/DD')
                        )
                    ) {
                        return data
                    }
                })
            }
        },
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY')
        },
        askForDeleteBrewery(event) {
            this.displayConfirm = true
            this.alertTitle = 'Esta seguro?'
            this.alertMessage =
                'Se va a proceder a eliminar esta casa cervecera'
            this.workingDeletedId = event.id
        },
        addToData(id, data) {
            data.firebaseId = id
            this.completeData.push(data)
            this.data.push(data)
        },
        editData(id, data) {
            data.firebaseId = id
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.completeData.splice(index, 1, data)
                    this.data.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.firebaseId === id) {
                    this.completeData.splice(index, 1)
                    this.data.splice(index, 1)
                }
            })
        },
    },
    async mounted() {
        this.displayLoading = true
        try {
            let db = firebase.firestore()
            db.collection('order').onSnapshot(snapshot => {
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
            })
        } catch (error) {
            console.log(`error in Brewing House with firebase`)
        }
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
