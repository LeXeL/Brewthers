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
        <mb-footer :page="'movingbeer'" />
        <!-- END FOOTER -->

        <!-- SHOPPING CART -->
        <q-drawer
            side="right"
            v-model="drawerRight"
            :overlay="mobileDrawer"
            :width="400"
            :breakpoint="500"
            content-class="bg-dark"
            class="fixed-right"
        >
            <q-scroll-area class="fit" v-if="data.length > 0">
                <div class="q-mt-md q-mb-md">
                    <div class="text-h5 text-center">CARRITO DE COMPRAS</div>
                </div>
                <div v-for="(item, i) in data[0].cart" :key="i">
                    <CartItemTile :item="item" @deleteItemFromCart="deleteFromCart" />
                </div>
                <div
                    class="row text-center"
                    style="margin-top: 300px;"
                    v-if="!data[0].cart || data[0].cart.length == 0"
                >
                    <div class="col">
                        <i class="fas fa-beer" style="color: #5c5c5c; font-size: 65px;"></i>
                        <p
                            style="color: #5c5c5c; font-size: 18px;"
                        >Parece que la marea esta baja y no tienes artículos en tu carrito.</p>
                    </div>
                </div>
                <div
                    class="text-h6 text-right on-left fixed-bottom"
                    style="bottom: 65px;"
                    v-if="data[0].cart.length > 0"
                >
                    Sub-total
                    <br />
                    ${{calculateTotal()}}
                </div>
                <div class="fixed-bottom">
                    <q-btn
                        class="full-width"
                        color="primary"
                        label="Checkout"
                        size="lg"
                        square
                        v-if="data[0].cart.length > 0"
                        @click="$router.push('/checkout'); drawerRight = false"
                    />
                </div>
            </q-scroll-area>
        </q-drawer>
        <!-- END SHOPPING CART -->
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import Navbar from '@/components/movingbeer/Navbar.vue'
import Footer from '@/components/general/Footer.vue'
import CartItemTile from '@/components/movingbeer/CartItemTile.vue'

export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
    data() {
        return {
            mobileDrawer: false,
            drawerRight: false,
            data: [],
        }
    },
    methods: {
        calculateTotal() {
            let total = 0
            if (this.data[0].cart) {
                this.data[0].cart.forEach(product => {
                    total +=
                        parseFloat(product.price) * parseFloat(product.amount)
                })
                return total.toFixed(2)
            }
            return '0'
        },
        deleteFromCart(product) {
            try {
                api.removeFromShoppingCart({uid: this.uid, product: product})
            } catch (error) {
                console.log(error)
            }
        },
        addToData(id, data) {
            data.id = id
            this.data.push(data)
        },
        editData(id, data) {
            data.id = id
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1)
                }
            })
        },
    },
    mounted() {
        try {
            let db = firebase.firestore()
            db.collection('users')
                .doc(this.uid)
                .onSnapshot(
                    {
                        // Listen for document metadata changes
                        includeMetadataChanges: true,
                    },
                    doc => {
                        // ...
                        if (this.data.length < 1) {
                            this.addToData(doc.id, doc.data())
                            return
                        }
                        this.editData(doc.id, doc.data())
                    }
                )
        } catch (error) {
            console.log(error)
        }
    },
    beforeMount() {
        if (this.$q.platform.is.mobile) this.mobileDrawer = true
    },
    components: {
        'mb-navbar': Navbar,
        'mb-footer': Footer,
        CartItemTile,
    },
}
</script>

<style scoped>
@import './../styles/movingbeer.css';
</style>
