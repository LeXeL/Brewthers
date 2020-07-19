<template>
    <q-page class="movingbeer-pattern-bg">
        <carousel />
        <section>
            <div class="row q-pt-xl">
                <div class="col">
                    <div
                        class="text-h3 text-center"
                        style="text-transform: uppercase;"
                    >
                        Familia brewthers
                    </div>
                </div>
            </div>
            <div class="row">
                <div
                    class="col-lg-3 col-sm-3 col-xs-12"
                    v-for="(brew, i) in brewers"
                    :key="i"
                >
                    <beer-house-tile
                        :brew="brew"
                        :products="products"
                        @openBeerHouse="beerHouseDialog"
                    />
                </div>
            </div>
        </section>
        <q-dialog
            v-if="brewerWorkingId"
            v-model="dialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-down"
            transition-hide="slide-up"
        >
            <q-card class="bg-dark text-white">
                <q-bar>
                    <q-space />
                    <q-btn dense flat v-close-popup>
                        <i class="fas fa-times" style="font-size: 25px;"></i>
                        <q-tooltip content-class="bg-white text-primary"
                            >Cerrar</q-tooltip
                        >
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h4 text-center">
                        {{
                            brewers.filter(brew => {
                                if (brew.id === brewerWorkingId) return brew
                            })[0].name
                        }}
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="row q-mb-md">
                        <div class="col"></div>
                        <div class="col-lg-1 col-xs-6">
                            <q-img
                                class="rounded-borders"
                                :src="
                                    brewers.filter(brew => {
                                        if (brew.id === brewerWorkingId)
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
                        <div class="col-lg-2 col-xs-10">
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
                    <div class="row"></div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div
                            class="col-lg-2 col-xs-12 rounded-corners"
                            v-for="(product, i) in productsInHouse"
                            :key="i"
                        >
                            <beer-item-tile :product="product" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import Carousel from '@/components/movingbeer/Carousel.vue'
import BeerHouseTile from '@/components/movingbeer/BeerHouseTile.vue'
import BeerItemTile from '@/components/movingbeer/BeerItemTile.vue'

export default {
    data() {
        return {
            slide: 'first',
            type: 'Keg',
            dialog: false,
            maximizedToggle: true,
            brewers: [],
            products: [],
            brewerWorkingId: '',
            productsInHouse: [],
        }
    },
    watch: {
        type(newValue, oldValue) {
            this.productsInHouse = this.products.filter(product => {
                if (
                    product.brewery === this.brewerWorkingId &&
                    product.inventory > 0 &&
                    product.type.toLowerCase() === this.type.toLowerCase()
                )
                    return product
            })
        },
    },
    async mounted() {
        if (this.$store.getters.brewerys.length > 1) {
            this.brewers = this.$store.getters.brewerys
        } else {
            await api.returnAllBrewerys().then(response => {
                this.brewers = response.data.data
            })
        }
        await api.returnAllProducts().then(response => {
            this.products = response.data.data
        })
    },
    methods: {
        beerHouseDialog(event) {
            this.brewerWorkingId = event
            this.productsInHouse = this.products.filter(product => {
                if (
                    product.brewery === this.brewerWorkingId &&
                    product.inventory > 0 &&
                    product.type.toLowerCase() === this.type.toLowerCase()
                )
                    return product
            })
            this.dialog = true
        },
    },
    components: {
        Carousel,
        'beer-house-tile': BeerHouseTile,
        'beer-item-tile': BeerItemTile,
    },
}
// VIEWS NEEDED
// Home
// Login
// Display Item
// View / Edit profile
// Shopping Cart
// Checkout
// Order placed
// Orders history
</script>
