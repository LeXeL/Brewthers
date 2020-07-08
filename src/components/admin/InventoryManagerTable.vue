<template>
    <q-table
        title="Articulos en inventario"
        :data="data"
        :columns="columns"
        row-key="name"
        binary-state-sort
        dark
    >
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="status" :props="props">
                    {{ props.row.name }}
                    <q-popup-edit v-model="props.row.name" title="Actualizar nombre" buttons dark>
                        <q-input type="text" v-model="props.row.name" dense autofocus dark />
                    </q-popup-edit>
                </q-td>
                <q-td key="presentation" :props="props">{{ props.row.presentation }}</q-td>
                <q-td key="presentation" :props="props">{{ props.row.house }}</q-td>
                <q-td key="status" :props="props">
                    <q-btn
                        :color="props.row.status == true ? 'secondary' : 'warning'"
                        size="xs"
                        :label="props.row.status == true ? 'Desactivar' : 'Activar'"
                        @click="props.row.status = !props.row.status"
                    />
                </q-td>
                <q-td>
                    <q-btn color="info" size="xs" label="Detalles" to="/item-details" />
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
                    name: 'presentation',
                    align: 'left',
                    label: 'Presentacion',
                    field: 'presentation',
                    sortable: true,
                },
                {
                    name: 'house',
                    align: 'left',
                    label: 'Casa',
                    field: 'house',
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
                    label: 'Details',
                    align: 'left',
                },
                {
                    label: 'Eliminar',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
                {
                    name: 'Beer 1',
                    presentation: 'KEG',
                    house: 'Buena Vista Brewery',
                    status: false,
                },
            ],
        }
    },
}
</script>