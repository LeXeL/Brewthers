<template>
    <q-table
        title="Cuentas de administradores"
        :data="data"
        :columns="columns"
        row-key="name"
        class="full-width"
        dark
    >
        <template v-slot:top-right>
            <q-btn
                color="primary"
                size="sm"
                no-caps
                @click="$emit('openDialog')"
            >
                <i class="fas fa-plus"></i>
            </q-btn>
        </template>
        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th auto-width />
                <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    >{{ col.label }}</q-th
                >
            </q-tr>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td auto-width>
                    <!-- <q-btn size="sm" color="warning" round dense>
                        <i class="fas fa-user-alt-slash"></i>
                    </q-btn>-->
                </q-td>
                <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    >{{ col.value }}</q-td
                >
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
            ],
        }
    },
}
</script>