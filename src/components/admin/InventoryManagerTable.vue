<template>
    <q-table
        title="Articulos en inventario"
        :data="data"
        :columns="columns"
        row-key="name"
        binary-state-sort
        dark
        :pagination.sync="initialPagination"
    >
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="name" :props="props">
                    {{ props.row.name }}
                    <q-popup-edit
                        @save="
                            validateInput({
                                id: props.row.id,
                                newName: props.row.name,
                            })
                        "
                        v-model="props.row.name"
                        title="Actualizar nombre"
                        buttons
                        dark
                    >
                        <q-input
                            type="text"
                            v-model="props.row.name"
                            dense
                            autofocus
                            dark
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                    </q-popup-edit>
                </q-td>
                <q-td key="type" :props="props">
                    {{ props.row.type }}
                </q-td>
                <q-td key="inventory" :props="props">
                    {{ props.row.inventory }}
                    <q-popup-edit
                        v-model="props.row.inventory"
                        title="Actualizar cantidad"
                        buttons
                        dark
                        @save="
                            validateInventoryChange({
                                id: props.row.id,
                                inventory: props.row.inventory,
                            })
                        "
                    >
                        <q-input
                            type="number"
                            v-model="props.row.inventory"
                            dense
                            autofocus
                            dark
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                    </q-popup-edit>
                </q-td>
                <q-td key="brewery" :props="props" v-if="brewerys">{{
                    returnBreweryName(props.row.brewery)
                }}</q-td>
                <q-td key="status" :props="props">
                    <q-btn
                        :color="
                            props.row.status == 'inactive'
                                ? 'secondary'
                                : 'warning'
                        "
                        size="xs"
                        :label="
                            props.row.status == 'inactive'
                                ? 'Activar'
                                : 'Desactivar'
                        "
                        @click="
                            $emit('changestatus', {
                                id: props.row.id,
                                status: props.row.status,
                            })
                        "
                    />
                </q-td>
                <q-td>
                    <q-btn
                        color="info"
                        size="xs"
                        label="Detalles"
                        :to="`/item-details/${props.row.id}`"
                    />
                </q-td>
                <q-td>
                    <q-btn
                        color="red-7"
                        size="xs"
                        label="Eliminar"
                        @click="$emit('delete', {id: props.row.id})"
                    />
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script></script>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 0,
                // rowsNumber: xx if getting data from a server
            },
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
                    name: 'type',
                    align: 'left',
                    label: 'Tipo',
                    field: 'type',
                    sortable: true,
                },
                {
                    name: 'inventory',
                    align: 'left',
                    label: 'Inventario',
                    field: 'inventory',
                    sortable: true,
                },
                {
                    name: 'brewery',
                    align: 'left',
                    label: 'Casa',
                    field: 'brewery',
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
                    label: 'Detalles',
                    align: 'left',
                },
                {
                    label: 'Eliminar',
                    align: 'left',
                },
            ],
        }
    },
    methods: {
        returnBreweryName(breweryId) {
            let brewery = ''
            brewery = this.brewerys.find(brewery => brewery.id === breweryId)
            return !!brewery ? brewery.name : 'NaN'
        },
        validateInput(event) {
            if (event.newName.length > 0) {
                this.$emit('namechange', {id: event.id, newName: event.newName})
            }
        },
        validateInventoryChange(event) {
            this.$emit('inventorychange', {
                id: event.id,
                inventory: event.inventory,
            })
        },
    },
}
</script>
