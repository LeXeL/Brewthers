<template>
    <q-page class="q-pa-md">
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
                                {{ props.row.inventoryAmount }}
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Detalles"
                                    size="xs"
                                    to="/item-details/02njNch8EBtTS9WUEzH8"
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
export default {
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
                    label: 'Detalles',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'My Beer 123',
                    type: 'Caja',
                    inventoryAmount: 3,
                },
                {
                    name: 'My Beer 123',
                    type: 'KEG',
                    inventoryAmount: 3,
                },
            ],
        }
    },
}
</script>
