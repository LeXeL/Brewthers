<template>
    <q-table title="Treats" :data="data" :columns="columns" row-key="name" binary-state-sort dark>
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="status" :props="props">
                    {{ props.row.name }}
                    <q-popup-edit v-model="props.row.name" title="Actualizar nombre" buttons dark>
                        <q-input type="text" v-model="props.row.name" dense autofocus dark />
                    </q-popup-edit>
                </q-td>
                <q-td key="status" :props="props">
                    <q-btn
                        :color="props.row.status == true ? 'secondary' : 'warning'"
                        size="xs"
                        :label="props.row.status == true ? 'Desactivar' : 'Activar'"
                        @click="props.row.status = !props.row.status"
                    />
                </q-td>

                <q-td>
                    <q-btn color="red-7" size="xs" label="Eliminar" />
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
</script>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: 'name',
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
                    label: 'Eliminar',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: '2 Oceans',
                    status: false,
                },
                {
                    name: 'Back Yard Brewery',
                    status: false,
                },
                {
                    name: 'Boquete Brewing Company',
                    status: true,
                },
                {
                    name: 'Buena Vista Brewery',
                    status: true,
                },
                {
                    name: 'Casa Bruja Brewing Co.',
                    status: true,
                },
                {
                    name: 'Central',
                    status: true,
                },
                {
                    name: 'La Murga',
                    status: true,
                },
                {
                    name: 'La Rana Dorada',
                    status: true,
                },
                {
                    name: 'Tres Gatos',
                    status: true,
                },
            ],
        }
    },
}
</script>