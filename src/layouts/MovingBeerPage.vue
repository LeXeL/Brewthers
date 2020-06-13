<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg">
        <!-- NAVBAR -->
        <mb-navbar @toggleCart="drawerRight = !drawerRight" />
        <!-- END NAVBAR -->

        <!-- PAGE CONTAINER -->
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
        <!-- END PAGE CONTAINER -->

        <!-- FOOTER -->
        <mb-footer />
        <!-- END FOOTER -->

        <!-- SHOPPING CART -->
        <q-drawer
            side="right"
            v-model="drawerRight"
            :width="400"
            :breakpoint="500"
            content-class="bg-dark"
            class="fixed-right"
        >
            <q-scroll-area class="fit">
                <div class="q-mt-md q-mb-md">
                    <div class="text-h5 text-center">CARRITO DE COMPRAS</div>
                </div>
                <div v-for="(item, i) in 5" :key="i">
                    <q-item clickable ripple>
                        <q-item class="full-width">
                            <q-avatar rounded>
                                <img :src="require('@/assets/beer.jpg')" />
                            </q-avatar>
                            <q-item-section>
                                <span class="on-right"
                                    >Nombre item en venta</span
                                >
                                <span class="on-right">Cant. 35</span>
                            </q-item-section>

                            <q-item-section side>
                                <span class="on-left">$2.50 c/u</span>
                            </q-item-section>
                            <q-item-section side
                                ><i
                                    class="fas fa-times"
                                    style="font-size: 20px;"
                                ></i
                            ></q-item-section>
                        </q-item>
                    </q-item>
                </div>
                <div
                    class="text-h6 text-right on-left fixed-bottom"
                    style="bottom: 65px;"
                >
                    Sub-total<br />$150.00
                </div>
                <div class="fixed-bottom">
                    <q-btn
                        class="full-width"
                        color="primary"
                        label="Checkout"
                        size="lg"
                        square
                    />
                </div>
            </q-scroll-area>
        </q-drawer>
        <!-- END SHOPPING CART -->
    </q-layout>
</template>

<script>
import Navbar from '@/components/movingbeer/Navbar.vue'
import Footer from '@/components/movingbeer/Footer.vue'

export default {
    data() {
        return {
            drawerRight: false,
        }
    },
    components: {
        'mb-navbar': Navbar,
        'mb-footer': Footer,
    },
}
</script>

<style scoped>
@import './../styles/movingbeer.css';
</style>
