<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">
            Exclusividad y precios - Restaurant Name
        </div>
        <div class="row q-px-md">
            <div class="col-lg-6">
                <q-table
                    title="Casas cerveceras"
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
                            <q-td key="canBuy" :props="props">
                                <q-toggle
                                    v-model="props.row.canBuy"
                                    color="primary"
                                />
                                <!-- <q-checkbox v-model="props.row.canBuy" /> -->
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Administrar"
                                    size="xs"
                                    to="/exclusiveness-and-prices/1234"
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
                    name: 'canBuy',
                    label: 'Puede vender',
                    field: 'canBy',
                    align: 'left',
                },
                {
                    label: 'Precios',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Brewing House Name',
                    canBuy: true,
                },
                {
                    name: 'Brewing House Name',
                    canBuy: true,
                },
                {
                    name: 'Brewing House Name',
                    canBuy: true,
                },
                {
                    name: 'Brewing House Name',
                    canBuy: true,
                },
            ],
        }
    },
}
</script>
