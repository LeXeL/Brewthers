<template>
    <div>
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="row q-px-md q-py-sm">
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    :color="data.status === 'review' ? 'amber-9' : 'grey-6'"
                    size="sm"
                    class="q-mb-sm"
                    :disable="data.status == 'cancel'"
                >
                    <i class="fas fa-box q-mr-xs"></i>Por Revisar
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    :color="data.status === 'preparation' ? 'yellow-9' : 'grey-6'"
                    size="sm"
                    class="q-mb-sm"
                    :disable="data.status == 'cancel'"
                    @click="changeStatus('preparation')"
                >
                    <i class="fas fa-boxes q-mr-xs"></i>En Preparacion
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    :color="data.status === 'onroute' ? 'lime-8' : 'grey-6'"
                    size="sm"
                    class="q-mb-sm"
                    :disable="data.status == 'cancel'"
                    @click="changeStatus('onroute')"
                >
                    <i class="fas fa-truck q-mr-xs"></i>En Camino
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    :color="data.status === 'delivered' ? 'light-green-9' : 'grey-6'"
                    size="sm"
                    class="q-mb-sm"
                    :disable="data.status == 'cancel'"
                    @click="changeStatus('delivered')"
                >
                    <i class="fas fa-truck-loading q-mr-xs"></i>Entregado
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    :color="data.status === 'completed' ? 'secondary' : 'grey-6'"
                    size="sm"
                    class="q-mb-sm"
                    :disable="data.status == 'cancel'"
                    @click="changeStatus('completed')"
                >
                    <i class="fas fa-check q-mr-xs"></i>Completado
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn
                    color="red-7"
                    size="sm"
                    @click="alert= true"
                    :disable="data.status == 'cancel'"
                >
                    <i class="fas fa-times q-mr-xs"></i>Cancelar
                </q-btn>
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
                    <q-btn label="Confirmar" color="secondary" @click="cancelOrder" v-close-popup />
                    <q-btn label="Cancelar" color="red-7" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    props: {
        orderId: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            alert: false,
            group: [],
            cancelationReasons: [
                {label: 'This is cancelation reason 1', value: 'bat'},
                {label: 'This is cancelation reason 2', value: 'friend'},
                {label: 'This is cancelation reason 3', value: 'upload'},
            ],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        cancelOrder() {
            this.displayLoading = true
            let obj = this.data.logs
            api.changeOrderStatus({
                id: this.orderId,
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
                        id: this.orderId,
                        Order: {logs: obj},
                    })
                })
                .then(response => {
                    this.data.status = 'cancel'
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
        changeStatus(status) {
            this.displayLoading = true
            let obj = this.data.logs
            obj.push({
                action: 'Changed Status',
                section: `from: ${this.data.status} to ${status}`,
                who: this.user.email,
                time: Date.now(),
            })
            api.changeOrderStatus({id: this.orderId, status})
                .then(() => {
                    api.updateOrdersInformation({
                        id: this.orderId,
                        Order: {logs: obj},
                    })
                })
                .then(() => {
                    this.data.status = status
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha cambiado con exito el estado de la orden'
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
}
</script>
