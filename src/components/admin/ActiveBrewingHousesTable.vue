<template>
    <div>
        <q-table
            title="Casas cerveceras activas"
            :data="data"
            :columns="columns"
            row-key="name"
            dark
        >
            <template v-slot:top-right>
                <q-btn
                    color="primary"
                    size="sm"
                    no-caps
                    @click="$emit('open-new-brewing-houses')"
                >
                    <i class="fas fa-plus"></i>
                </q-btn>
            </template>

            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn
                            size="sm"
                            color="primary"
                            round
                            dense
                            :to="`/account-details/${props.row.id}`"
                        >
                            <i class="fas fa-eye"></i>
                        </q-btn>
                    </q-td>
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.value }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
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
                    name: 'brewingHouseName',
                    align: 'left',
                    label: 'Casa cervecera',
                    field: 'brewingHouseName',
                    sortable: true,
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
                    sortable: true,
                },
            ],
        }
    },
}
</script>