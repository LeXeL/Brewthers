<template>
    <q-page class="q-pa-md" v-if="data.length > 0">
        <div class="text-h5 q-mb-md text-white">Clientes Brewthers</div>
        <div class="row q-mb-md">
            <div class="col-lg-2 q-pa-md">
                <q-input
                    filled
                    label="Nombre"
                    color="primary"
                    v-model="inputName"
                    dark
                    dense
                />
            </div>
        </div>
        <div class="row q-px-md">
            <div class="col">
                <q-table
                    title="Restaurantes"
                    :data="filteredData"
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
                                <q-badge
                                    :color="
                                        props.row.canBuy ? 'secondary' : 'red-7'
                                    "
                                >
                                    {{ props.row.canBuy ? 'Si' : 'No' }}
                                    <q-tooltip
                                        content-class="bg-primary"
                                        content-style="font-size: 14px; width: 200px;"
                                        v-if="
                                            !props.row.canBuy &&
                                            !!props.row.note
                                        "
                                    >
                                        {{ props.row.note }}
                                    </q-tooltip>
                                </q-badge>
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Ver"
                                    size="xs"
                                    :to="`/clients/${props.row.id}`"
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
import * as api from '@/api/api'
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
                    label: 'Puede comprar',
                    align: 'left',
                    field: 'canBuy',
                },
                {
                    label: 'Ver',
                    align: 'left',
                },
            ],
            data: [],
            inputName: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        filteredData() {
            return this.data.filter(rest =>
                rest.name.toLowerCase().includes(this.inputName.toLowerCase())
            )
        },
    },
    mounted() {
        api.returnApprovedUser().then(response => {
            if (response.status === 200) {
                this.data = response.data.data
                    .filter(rest => rest.role === 'user')
                    .map(rest => {
                        let obj = {}
                        obj.id = rest.id
                        obj.name = rest.restaurantName
                        obj.contact = `${rest.name} ${rest.lastName}`
                        obj.email = rest.email
                        obj.phone = rest.contactPhone
                        obj.canBuy = true
                        obj.note = rest.exclusiveness.notes
                        obj.products = !!rest.exclusiveness[this.user.breweryId]
                            ? rest.exclusiveness[this.user.breweryId].products
                            : []
                        if (
                            Object.keys(rest.exclusiveness).length > 0 &&
                            !Object.keys(rest.exclusiveness).includes(
                                this.user.breweryId
                            )
                        ) {
                            obj.canBuy = false
                        }
                        return obj
                    })
            }
        })
    },
}
</script>
