<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de casas cerveceras</div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <q-table
                    title="Treats"
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
                                <q-popup-edit
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
                                    />
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
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-card class="my-card text-white full-width" dark>
                    <q-card-section>
                        <div class="text-h6">Nueva casa cervecera</div>
                    </q-card-section>

                    <q-card-section>
                        <q-input filled dark label="Nombre" class="q-mb-md" />
                        <q-file filled dark label="Logo">
                            <template v-slot:prepend>
                                <i class="fas fa-paperclip"></i>
                            </template>
                        </q-file>
                    </q-card-section>

                    <q-separator dark />

                    <q-card-actions>
                        <q-space />
                        <q-btn color="secondary">Guardar</q-btn>
                        <q-btn color="red-7">Cancelar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

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