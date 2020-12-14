<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">Clientes Brewthers</div>
        <div class="row q-mb-md">
            <div class="col-lg-2 q-pa-md">
                <q-input filled label="Nombre" color="primary" dark dense />
            </div>
            <div class="col-lg-2 q-pa-md">
                <q-input filled label="Correo" color="primary" dark dense />
            </div>
        </div>
        <div class="row q-px-md">
            <div class="col">
                <q-table
                    title="Restaurantes"
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
                            <q-td key="email" :props="props">
                                {{ props.row.email }}
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
                    name: 'email',
                    label: 'Correo',
                    align: 'left',
                    field: 'email',
                },
                {
                    label: 'Administrar',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Frozen Yogurt',
                    email: 'asdf@asdf.com',
                },
                {
                    name: 'Frozen Yogurt',
                    email: 'asdf@asdf.com',
                },
                {
                    name: 'Frozen Yogurt',
                    email: 'asdf@asdf.com',
                },
                {
                    name: 'Frozen Yogurt',
                    email: 'asdf@asdf.com',
                },
                {
                    name: 'Frozen Yogurt',
                    email: 'asdf@asdf.com',
                },
            ],
        }
    },
}
</script>
