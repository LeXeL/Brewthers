<template>
    <q-table
        title="Cuentas activas"
        :data="data"
        :columns="columns"
        row-key="name"
        class="full-width"
        dark
        :pagination="{rowsPerPage: 50}"
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
                <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
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
            columns: [
                {
                    name: 'restaurantName',
                    label: 'Restaurante',
                    align: 'left',
                    field: 'restaurantName',
                    sortable: true,
                },
                {
                    name: 'name',
                    label: 'Nombre',
                    align: 'left',
                    field: 'name',
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
                    name: 'contactPhone',
                    label: 'Celular',
                    field: 'contactPhone',
                    align: 'left',
                },
            ],
        }
    },
}
</script>