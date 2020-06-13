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
                        @openBeerHouse="beerHouseDialog()"
                    />
                </div>
            </div>
        </section>
        <q-dialog
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
                            >Close</q-tooltip
                        >
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum repellendus sit voluptate voluptas eveniet porro.
                    Rerum blanditiis perferendis totam, ea at omnis vel numquam
                    exercitationem aut, natus minima, porro labore.
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import Carousel from '@/components/movingbeer/Carousel.vue'
import BeerHouseTile from '@/components/movingbeer/BeerHouseTile.vue'

export default {
    data() {
        return {
            slide: 'first',
            dialog: false,
            maximizedToggle: true,
            brewers: [
                {
                    name: 'Boquete Brewing Company',
                    logo: 'boquete-brewing-co.png',
                },
                {
                    name: 'Buena Vista Brewery',
                    logo: 'buena-vista-brew.jpg',
                },
                {
                    name: 'Casa Bruja',
                    logo: 'casa-bruja.png',
                },
                {
                    name: 'Cerveza La Murga',
                    logo: 'la-murga.jpg',
                },
                {
                    name: '2 Oceans Brewing',
                    logo: '2-oceans.jpg',
                },
            ],
        }
    },
    methods: {
        beerHouseDialog() {
            this.dialog = true
        },
    },
    components: {
        Carousel,
        'beer-house-tile': BeerHouseTile,
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
