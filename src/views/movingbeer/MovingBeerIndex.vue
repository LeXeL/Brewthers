<template>
    <q-page class="movingbeer-pattern-bg">
        <carousel />
        <confirm-dialog
            :title="'Confirmacion'"
            :message="'Estas seguro que no eres trolaso?'"
            :display="confirm"
            @accept="sendAlert('accept')"
            @cancel="sendAlert('cancel')"
        ></confirm-dialog>
        <q-btn color="primary" label="Trigger confirm" @click="triggerConfirm()" />
        <section>
            <div class="row q-pt-xl">
                <div class="col">
                    <div
                        class="text-h3 text-center"
                        style="text-transform: uppercase;"
                    >Familia brewthers</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-sm-3 col-xs-12" v-for="(brew, i) in brewers" :key="i">
                    <beer-house-tile :brew="brew" @openBeerHouse="beerHouseDialog()" />
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
                        <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h4 text-center">Brewing House Name</div>
                </q-card-section>

                <q-card-section>
                    <div class="row q-mb-md">
                        <div class="col"></div>
                        <div class="col-lg-1">
                            <q-img
                                :src="
                                    require(`@/assets/familia-brewthers/2-oceans.png`)
                                "
                            />
                        </div>
                        <div class="col"></div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-lg-2">
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
                        <div class="col-lg-2" v-for="(item, i) in 6" :key="i">
                            <beer-item-tile />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import Carousel from '@/components/movingbeer/Carousel.vue'
import BeerHouseTile from '@/components/movingbeer/BeerHouseTile.vue'
import BeerItemTile from '@/components/movingbeer/BeerItemTile.vue'

export default {
    data() {
        return {
            confirm: false,
            slide: 'first',
            type: 'Keg',
            dialog: false,
            maximizedToggle: true,
            brewers: [
                {
                    name: '2 Oceans Brewing',
                    logo: '2-oceans.png',
                },
                {
                    name: 'Backyard',
                    logo: 'back-yard.png',
                },
                {
                    name: 'Boquete Brewing Company',
                    logo: 'boquete-brewing.png',
                },
                {
                    name: 'Buena Vista',
                    logo: 'buena-vista.png',
                },
                {
                    name: 'Casa Bruja',
                    logo: 'casa-bruja.png',
                },
                {
                    name: 'Central',
                    logo: 'central.png',
                },
                {
                    name: 'La Murga',
                    logo: 'la-murga.png',
                },
                {
                    name: 'Rana Dorada',
                    logo: 'rana-dorada.png',
                },
                {
                    name: 'Tres Gatos',
                    logo: 'tres-gatos.png',
                },
            ],
        }
    },
    methods: {
        beerHouseDialog() {
            this.dialog = true
        },
        triggerConfirm() {
            this.confirm = !this.confirm
        },
        sendAlert(type) {
            alert(`Clicked: ${type}`)
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
