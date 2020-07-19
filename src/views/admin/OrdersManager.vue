<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de ordernes</div>
        <div class="row">
            <q-space class="desktop-only" />
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-select
                    filled
                    :options="options"
                    label="Estatus"
                    dark
                    dense
                />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled label="No. de Orden" dark dense />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled label="Restaurante" dark dense />
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled mask="date" label="Fecha inicial" dark dense>
                    <template v-slot:append>
                        <i class="far fa-calendar-alt cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="date"
                                    @input="() => $refs.qDateProxy.hide()"
                                    dark
                                />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-2 col-xs-12 q-pa-md">
                <q-input filled mask="date" label="Fecha final" dark dense>
                    <template v-slot:append>
                        <i class="far fa-calendar-alt cursor-pointer">
                            <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="date"
                                    @input="() => $refs.qDateProxy.hide()"
                                    dark
                                />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input>
            </div>
            <div class="col-lg-1 q-pa-md">
                <q-btn class="full-height" color="primary" label="Buscar" />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12 q-pa-md">
                <q-table
                    title="Ordenes existentes"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :pagination="initialPagination"
                    binary-state-sort
                    dark
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="orderNo" :props="props">{{
                                props.row.orderNo
                            }}</q-td>
                            <q-td key="restName" :props="props">{{
                                props.row.restName
                            }}</q-td>
                            <q-td key="email" :props="props">{{
                                props.row.email
                            }}</q-td>
                            <q-td key="phone" :props="props">{{
                                props.row.phone
                            }}</q-td>
                            <q-td key="items" :props="props">{{
                                props.row.items
                            }}</q-td>
                            <q-td key="amount" :props="props"
                                >$ {{ props.row.amount }}</q-td
                            >
                            <q-td key="paymentMethod" :props="props">{{
                                props.row.paymentMethod
                            }}</q-td>
                            <q-td key="date" :props="props">{{
                                props.row.date
                            }}</q-td>

                            <q-td>
                                <q-btn
                                    :color="status[props.row.status].color"
                                    size="xs"
                                    :props="props"
                                    :label="status[props.row.status].text"
                                    @click="
                                        props.row.status < 4
                                            ? props.row.status++
                                            : ''
                                    "
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="info"
                                    size="xs"
                                    label="Detalles"
                                    to="/order-details"
                                />
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
                    <q-btn label="Confirmar" color="secondary" v-close-popup />
                    <q-btn label="Cancelar" color="red-7" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: '2019/02/01',
            alert: false,
            initialPagination: {rowsPerPage: 15},
            options: [
                'Abiertas',
                'Por revisar',
                'En preparacion',
                'En camino',
                'Entregado',
                'Completado',
                'Todas',
            ],
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
            data: [
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 0,
                },
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 1,
                },
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 2,
                },
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 3,
                },
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 4,
                },
                {
                    orderNo: 159789,
                    restName: 'La Cocina de Pepe',
                    something: 'asdf',
                    email: 'pepe@live.com',
                    phone: '6565-6556',
                    items: 10,
                    amount: 50.78,
                    paymentMethod: 'ACH',
                    date: '10-10-10',
                    status: 5,
                },
            ],
            status: [
                {
                    text: 'Por revisar',
                    color: 'amber-9',
                },
                {
                    text: 'En preparacion',
                    color: 'yellow-9',
                },
                {
                    text: 'En camino',
                    color: 'lime-8',
                },
                {
                    text: 'Entregado',
                    color: 'light-green-9',
                },
                {
                    text: 'Completado',
                    color: 'secondary',
                },
                {
                    text: 'Cancelada',
                    color: 'red-7',
                },
            ],
        }
    },
}
</script>
