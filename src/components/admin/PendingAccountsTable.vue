<template>
    <q-table
        title="Cuentas por aprobar"
        :data="data"
        :columns="columns"
        row-key="name"
        class="full-width q-mb-lg"
        :pagination="initialPagination"
        dark
    >
        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
            </q-tr>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td auto-width>
                    <q-btn
                        size="sm"
                        color="primary"
                        round
                        dense
                        :to="`/account-details/${props.row.id}`"
                    >
                        <i class="fas fa-eye"></i>
                    </q-btn>
                </q-td>
                <!-- <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    >{{ col.value }}</q-td
                >-->
                <q-td :prop="props">{{ props.row.restaurantName }}</q-td>
                <q-td :prop="props">{{ props.row.email }}</q-td>
                <q-td :prop="props">
                    <q-badge
                        :color="props.row.status == 'pending' ? 'warning' : 'red-7'"
                    >{{ props.row.status == 'pending' ? 'Pendiente' : 'Rechazado' }}</q-badge>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            initialPagination: {
                sortBy: 'status',
                descending: false,
            },
            columns: [
                {
                    name: 'restaurantName',
                    label: 'Restaurante',
                    align: 'left',
                    field: 'restaurantName',
                    sortable: true,
                },

                {
                    name: 'email',
                    label: 'Correo',
                    field: 'email',
                    align: 'left',
                    sortable: true,
                },

                {
                    name: 'status',
                    label: 'Estatus',
                    field: 'status',
                    sortable: true,
                    align: 'left',
                },
            ],
        }
    },
}
</script>
