<template>
    <q-page class="q-pa-md" v-if="!!restaurantInfo">
        <div class="text-h5 q-mb-md text-white">
            {{ restaurantInfo.restaurantName }}
        </div>
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
                            <q-td key="type" :props="props">
                                {{ props.row.type }}
                            </q-td>
                            <q-td key="price" :props="props">
                                $ {{ props.row.price.toFixed(2) }}
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
                    name: 'type',
                    label: 'Presentacion',
                    field: 'type',
                    align: 'left',
                    sortable: true,
                },
                {
                    name: 'price',
                    label: 'Precio regular',
                    field: 'price',
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
            data: [],
            allBreweryProducts: [],
            restaurantInfo: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    mounted() {
        api.getuserinformationbyid({
            uid: this.$route.params.id,
        }).then(response => (this.restaurantInfo = response.data.data))
        api.getAllProductsByBreweryId({
            id: this.user.breweryId,
        }).then(response => {
            if (response.status === 200) {
                let data = response.data.data
                this.data = data.map(product => {
                    let obj = {...product}
                    let exclusiveness = this.restaurantInfo.exclusiveness[
                        this.user.breweryId
                    ]
                    if (!!exclusiveness) {
                        let workingProduct = exclusiveness.products.find(
                            prod => prod.id === product.id
                        )
                        obj.specialPrice = !!workingProduct
                            ? workingProduct.newPrice
                            : product.price
                    } else {
                        obj.specialPrice = product.price
                    }
                    return obj
                })
            }
        })
    },
}
</script>
