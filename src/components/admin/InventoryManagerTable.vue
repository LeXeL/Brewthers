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
                <q-td key="name" :props="props">
                    {{ props.row.name }}
                    <q-popup-edit
                        v-model="props.row.name"
                        @save="$emit('namechange',{id:props.row.id,newName:props.row.name})"
                        title="Actualizar nombre"
                        buttons
                        dark
                    >
                        <q-input type="text" v-model="props.row.name" dense autofocus dark />
                    </q-popup-edit>
                </q-td>
                <q-td key="presentation" :props="props">
                    {{
                    props.row.type
                    }}
                </q-td>
                <q-td key="stock" :props="props">{{ props.row.inventory }}</q-td>
                <q-td
                    key="house"
                    :props="props"
                >{{ brewerys.filter(brewery=> {if(brewery.id === props.row.brewery) return brewery})[0].name }}</q-td>
                <q-td key="status" :props="props">
                    <q-btn
                        :color="props.row.status == 'inactive' ? 'secondary' : 'warning'"
                        size="xs"
                        :label="props.row.status == 'inactive' ? 'Activar' : 'Desactivar'"
                        @click="$emit('changeStatus',{id:props.row.id,status:props.row.status})"
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
                        @click="$emit('delete',{id:props.row.id})"
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
                    name: 'stock',
                    align: 'left',
                    label: 'Inventario',
                    field: 'stock',
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
}
</script>
