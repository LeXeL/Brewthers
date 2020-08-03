<template>
    <q-page>
        <!-- <div class="row justify-center q-mb-lg">
            <div class="text-h4">Beer House Name</div>
        </div>
        <div class="row justify-center q-mb-lg">
            <div class="col"></div>
            <div class="col-lg-1 col-sm-3 col-xs-6">
                <q-img
                    class="rounded-borders"
                    :src="require('@/assets/familia-brewthers/2-oceans.png')"
                />
            </div>
            <div class="col"></div>
        </div>
        <div class="row justify-center q-mb-lg">
            <div class="col"></div>
            <div class="col-lg-2 col-sm-8 col-xs-10">
                <q-select
                    v-model="type"
                    filled
                    dark
                    :options="['Keg', 'Caja']"
                    label="Selecione un tipo"
                    class="full-width"
                />
            </div>
            <div class="col"></div>
        </div>-->
        <q-card class="text-white full-width" style="background-color: #1f2120;">
            <q-bar class="q-ma-md" style="background-color: #1f2120">
                <q-space />
                <q-btn dense flat @click="$emit('closeCatalog')">
                    <i class="fas fa-times" style="font-size: 25px;"></i>
                    <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section>
                <div class="text-h4 text-center">
                    {{
                    allBrewers.filter(brew => {
                    if (brew.id === breweryId) return brew
                    })[0].name
                    }}
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col"></div>
                    <div class="col-lg-1 col-sm-3 col-xs-6">
                        <q-img
                            class="rounded-borders"
                            :src="
                                    allBrewers.filter(brew => {
                                        if (brew.id === breweryId)
                                            return brew
                                    })[0].photoLocation
                                "
                        />
                    </div>
                    <div class="col"></div>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col"></div>
                    <div class="col-lg-2 col-sm-8 col-xs-10">
                        <q-select
                            v-model="type"
                            outlined
                            dark
                            :options="['Keg', 'Caja']"
                            label="Selecione un tipo"
                        />
                    </div>
                    <div class="col"></div>
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div
                        class="col-lg-2 col-sm-6 col-xs-12 rounded-corners"
                        v-for="(product, i) in productsInHouse"
                        :key="i"
                    >
                        <beer-item-tile :product="product" />
                    </div>
                </div>
                <div
                    class="row text-center"
                    style="margin-top: 100px;"
                    v-if="productsInHouse.length == 0"
                >
                    <div class="col">
                        <i class="fas fa-beer" style="color: #5c5c5c; font-size: 100px;"></i>
                        <p
                            style="color: #5c5c5c; font-size: 18px;"
                        >Lo sentimos, por el momento no tenemos inventario de esta presentación.</p>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import BeerItemTile from '@/components/movingbeer/BeerItemTile.vue'

export default {
    props: {
        allProducts: {
            type: Array,
            default: () => {
                return []
            },
        },
        allBrewers: {
            type: Array,
            default: () => {
                return []
            },
        },
        breweryId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            type: 'Keg',
            productsInHouse: [],
        }
    },
    watch: {
        type() {
            this.filterProductsInHouse(this.type)
        },
    },
    methods: {
        filterProductsInHouse(type) {
            this.productsInHouse = []
            this.productsInHouse = this.allProducts.filter(product => {
                if (
                    product.brewery === this.breweryId &&
                    product.inventory > 0 &&
                    product.type.toLowerCase() === type.toLowerCase()
                )
                    return product
            })
            return this.productsInHouse
        },
    },
    mounted() {
        window.scrollTo(0, 0)
        this.filterProductsInHouse(this.type)
    },
    components: {
        'beer-item-tile': BeerItemTile,
    },
}
</script>