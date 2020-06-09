<template>
    <q-page class="movingbeer-pattern-bg">
        <q-carousel arrows animated v-model="slide" height="600px">
            <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
                <div class="absolute-center full-width custom-caption">
                    <div
                        class="text-h2"
                        style="font-family: GilroyExtraBold; text-transform: uppercase"
                    >Bienvenido a movingbeer</div>
                </div>
            </q-carousel-slide>
        </q-carousel>

        <section>
            <div class="row q-pt-xl">
                <div class="col">
                    <div
                        class="text-h3 text-center"
                        style="font-family: GilroyExtraBold; text-transform: uppercase;"
                    >Familia brewthers</div>
                </div>
            </div>
            <div class="row q-pa-xl">
                <div class="col-lg-3" v-for="(brew, i) in brewers" :key="i">
                    <q-card
                        class="my-card q-mb-xl justify-center movingbeer-tile"
                        @click="dialog = true"
                    >
                        <q-img
                            :src="require(`@/assets/familia-brewthers/${brew.logo}`)"
                            width="100%"
                            class
                            basic
                        >
                            <div
                                class="absolute-bottom text-h6 text-center movingbeer-tile-overlay"
                            >{{ brew.name }}</div>
                        </q-img>
                    </q-card>
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
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
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
