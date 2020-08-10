<template>
    <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="name"
        binary-state-sort
        dark
        :pagination="{rowsPerPage: 15}"
    >
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="name" :props="props">
                    {{ props.row.name }}
                    <q-popup-edit
                        v-model="props.row.name"
                        @save="validateInput({id:props.row.id,newName:props.row.name})"
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
                <q-td key="status" :props="props">
                    <q-btn
                        :color="props.row.status == 'inactive' ? 'secondary' : 'warning'"
                        size="xs"
                        :label="props.row.status == 'inactive' ? 'Activar' : 'Desactivar'"
                        @click="$emit('changestatus',{id:props.row.id,status:props.row.status})"
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
        }
    },
    methods: {
        validateInput(event) {
            if (event.newName.length > 0) {
                this.$emit('namechange', {id: event.id, newName: event.newName})
            }
        },
    },
}
</script>