<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">Restaurant Name</div>
        <div class="row q-px-md">
            <div class="col">
                <q-table
                    title="Mis Cervezas"
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
                            <q-td key="regularPrice" :props="props">
                                $ {{ props.row.regularPrice.toFixed(2) }}
                            </q-td>
                            <q-td key="specialPrice" :props="props">
                                $ {{ props.row.specialPrice.toFixed(2) }}
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
                    name: 'regularPrice',
                    label: 'Precio regular',
                    field: 'regularPrice',
                    align: 'left',
                    sortable: true,
                },
                {
                    name: 'specialPrice',
                    label: 'Precio especial',
                    field: 'specialPrice',
                    align: 'left',
                    sortable: true,
                },
            ],
            data: [
                {
                    name: 'Beer Name',
                    regularPrice: 15,
                    specialPrice: 12.25,
                },
                {
                    name: 'Beer Name',
                    regularPrice: 15,
                    specialPrice: 12.25,
                },
                {
                    name: 'Beer Name',
                    regularPrice: 15,
                    specialPrice: 12.25,
                },
                {
                    name: 'Beer Name',
                    regularPrice: 15,
                    specialPrice: 12.25,
                },
                {
                    name: 'Beer Name',
                    regularPrice: 15,
                    specialPrice: 12.25,
                },
            ],
        }
    },
}
</script>
