<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="text-h5 q-mb-md text-white">Mi Inventario</div>
        <div class="row q-px-md">
            <div class="col">
                <q-table
                    title="Mis cervezas"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    dark
                    binary-state-sort
                    :pagination.sync="initialPagination"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">
                                {{ props.row.name }}
                            </q-td>
                            <q-td key="type" :props="props">
                                {{ props.row.type }}
                            </q-td>
                            <q-td key="inventoryAmount" :props="props">
                                {{ props.row.inventory }}
                            </q-td>
                            <q-td key="id" :props="props">
                                <q-btn
                                    color="primary"
                                    label="Detalles"
                                    size="xs"
                                    :to="`/brewery-admin/item-details/${props.row.id}`"
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            columns: [
                {
                    name: 'name',
                    label: 'Nombre',
                    field: 'name',
                    align: 'left',
                    sortable: true,
                },
                {
                    name: 'type',
                    label: 'Tipo',
                    align: 'left',
                    field: 'type',
                    sortable: true,
                },
                {
                    name: 'inventoryAmount',
                    label: 'Cantidad',
                    align: 'left',
                    field: 'inventoryAmount',
                    sortable: true,
                },
                {
                    name: 'id',
                    label: 'Detalles',
                    align: 'left',
                    field: 'id',
                },
            ],
            data: [],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 0,
                // rowsNumber: xx if getting data from a server
            },
        }
    },
    mounted() {
        this.displayLoading = true
        api.getAllProductsByBreweryId({
            id: this.user.breweryId,
        }).then(response => {
            this.data = response.data.data
            this.displayLoading = false
        })
    },
}
</script>
