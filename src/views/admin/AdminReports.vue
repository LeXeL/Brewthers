<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">Reportes Brewthers</div>
        <div class="row">
            <div class="col">
                <q-table
                    title="Exportar reporte"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :pagination.sync="initialPagination"
                    binary-state-sort
                    dark
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">
                                {{ props.row.name }}
                            </q-td>

                            <q-td>
                                <q-btn
                                    color="info"
                                    size="sm"
                                    label="EXPORTAR CSV"
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
            date: '2019/02/01',
            alert: false,
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 15,
                // rowsNumber: xx if getting data from a server
            },
            options: [
                'Abiertas',
                'Por revisar',
                'En preparacion',
                'En camino',
                'Entregado',
                'Completado',
                'Todas',
            ],
            group: [],
            cancelationReasons: [
                {label: 'This is cancelation reason 1', value: 'bat'},
                {label: 'This is cancelation reason 2', value: 'friend'},
                {label: 'This is cancelation reason 3', value: 'upload'},
            ],
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Reporte',
                    align: 'left',
                    field: 'name',
                },
                {
                    label: 'Exporter',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Nombre del reporte',
                },
                {
                    name: 'Nombre del reporte',
                },
                {
                    name: 'Nombre del reporte',
                },
                {
                    name: 'Nombre del reporte',
                },
                {
                    name: 'Nombre del reporte',
                },
                {
                    name: 'Nombre del reporte',
                },
            ],
            status: [
                {
                    text: 'Por revisar',
                    color: 'amber-9',
                },
                {
                    text: 'En preparacion',
                    color: 'yellow-9',
                },
                {
                    text: 'En camino',
                    color: 'lime-8',
                },
                {
                    text: 'Entregado',
                    color: 'light-green-9',
                },
                {
                    text: 'Completado',
                    color: 'secondary',
                },
                {
                    text: 'Cancelada',
                    color: 'red-7',
                },
            ],
        }
    },
}
</script>
