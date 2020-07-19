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
                <div class="text-h6 text-right on-left fixed-bottom" style="bottom: 65px;">
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
            drawerRight: false,
            data: [],
        }
    },
    methods: {
        calculateTotal() {
            let total = 0
            this.data[0].cart.forEach(product => {
                total += parseFloat(product.price) * parseFloat(product.amount)
            })
            return total.toFixed(2)
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
        let db = firebase.firestore()
        db.collection('users').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.doc.id === this.uid) {
                    if (change.type === 'added') {
                        this.addToData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeData(change.doc.id)
                    }
                }
            })
        })
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
