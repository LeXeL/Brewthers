<template>
    <q-page class="movingbeer-pattern-bg">
        <beer-house-catalog
            v-if="dialog"
            :allProducts="products"
            :allBrewers="brewers"
            :breweryId="brewerWorkingId"
            @closeCatalog="closeOpenCatalog"
        />
        <section v-if="!dialog">
            <carousel />
            <div class="row q-pt-xl">
                <div class="col">
                    <div
                        class="text-h3 text-center"
                        style="text-transform: uppercase"
                    >
                        Familia brewthers
                    </div>
                </div>
            </div>
            <div class="row">
                <div
                    class="col-lg-3 col-md-3 col-sm-4 col-sm-3 col-xs-12"
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
    </q-page>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import Carousel from '@/components/movingbeer/Carousel.vue'
import BeerHouseTile from '@/components/movingbeer/BeerHouseTile.vue'
import BeerHouseCatalog from '@/components/movingbeer/BeerHouseCatalog.vue'

export default {
    data() {
        return {
            slide: 'first',
            dialog: false,
            brewers: [],
            products: [],
            brewerWorkingId: '',
        }
    },
    computed: {
        movingbeerXY() {
            return this.$store.getters.movingbeerXY
        },
    },
    async mounted() {
        if (this.$store.getters.brewerys.length > 1) {
            this.brewers = this.$store.getters.brewerys.filter(
                brewery => brewery.status === 'active'
            )
        } else {
            await api.returnAllBrewerys().then(response => {
                this.brewers = response.data.data.filter(
                    brewery => brewery.status === 'active'
                )
            })
        }
        await api.returnAllProducts().then(response => {
            this.products = response.data.data
        })
    },
    methods: {
        beerHouseDialog(event) {
            this.$store.commit('SET_MOVINGBEERXY', window.scrollY)
            this.brewerWorkingId = event
            this.dialog = true
        },
        closeOpenCatalog() {
            this.dialog = false
            if (this.movingbeerXY != 0) {
                window.scrollTo(0, 615)
            }
        },
    },
    components: {
        Carousel,
        'beer-house-tile': BeerHouseTile,
        'beer-house-catalog': BeerHouseCatalog,
    },
}
</script>
