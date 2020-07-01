<template>
    <q-table
        title="Cuentas por aprobar"
        :data="data"
        :columns="columns"
        row-key="name"
        class="full-width q-mb-lg"
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
                    <q-btn size="sm" color="primary" round dense to="/account-details">
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
    data() {
        return {
            columns: [
                {
                    name: 'rest',
                    label: 'Restaurante',
                    align: 'left',
                    field: 'rest',
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
            data: [
                {
                    rest: 'La Papa Caliente',
                    name: 'Pepe Veraz',
                    email: 'pepe.veraz@gmail.com',
                    phone: '6203-2566',
                    status: 'En revision',
                },
                {
                    rest: 'La Papa Caliente',
                    name: 'Pepe Veraz',
                    email: 'pepe.veraz@gmail.com',
                    phone: '6203-2566',
                    status: 'En revision',
                },
            ],
        }
    },
}
</script>