<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">Exclusividad y precios</div>
        <div class="row q-mb-md">
            <div class="col-lg-2 q-pa-md">
                <q-input
                    filled
                    label="Nombre"
                    color="primary"
                    dark
                    dense
                    v-model="searchName"
                />
            </div>
            <div class="col-lg-2 q-pa-md">
                <q-input
                    filled
                    label="Correo"
                    color="primary"
                    dark
                    dense
                    v-model="searchEmail"
                />
            </div>
        </div>
        <div class="row q-px-md">
            <div class="col">
                <q-table
                    title="Restaurantes"
                    :data="FilteredTable"
                    :columns="columns"
                    row-key="name"
                    dark
                    binary-state-sort
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="restaurantName" :props="props">
                                {{ props.row.restaurantName }}
                            </q-td>
                            <q-td key="email" :props="props">
                                {{ props.row.email }}
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Administrar"
                                    size="xs"
                                    :to="`/exclusiveness-and-prices/${props.row.id}`"
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
    data() {
        return {
            columns: [
                {
                    name: 'restaurantName',
                    label: 'Nombre',
                    field: 'restaurantName',
                    align: 'left',
                    sortable: true,
                },
                {
                    name: 'email',
                    label: 'Correo',
                    align: 'left',
                    field: 'email',
                },
                {
                    label: 'Administrar',
                    align: 'left',
                },
            ],
            data: [],
            searchName: '',
            searchEmail: '',
        }
    },
    computed: {
        FilteredTable() {
            let filteredData = []
            this.data.forEach(item => {
                if (
                    item.restaurantName
                        .toLowerCase()
                        .includes(this.searchName.toLowerCase()) &&
                    item.email.includes(this.searchEmail.toLowerCase())
                )
                    filteredData.push(item)
            })
            return filteredData
        },
    },
    mounted() {
        api.returnApprovedUser().then(
            response => (this.data = response.data.data)
        )
    },
}
</script>
