<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg text-white">
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="
                reset = true
                displayAlert = false
            "
        ></brewthers-alert>
        <!-- NAVBAR -->
        <mb-navbar />
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
            v-model="showDrawer"
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
                    <CartItemTile
                        :item="item"
                        @deleteItemFromCart="deleteFromCart"
                        @addAmountToItemInCart="addAmountToItem"
                        @subtractAmountToItemInCart="subtractAmountToItem"
                        :resetSpinner="reset"
                    />
                </div>
                <div
                    class="row text-center"
                    style="margin-top: 300px"
                    v-if="!data[0].cart || data[0].cart.length == 0"
                >
                    <div class="col">
                        <i
                            class="fas fa-beer"
                            style="color: #5c5c5c; font-size: 65px"
                        ></i>
                        <p style="color: #5c5c5c; font-size: 18px">
                            Parece que la marea esta baja y no tienes artículos
                            en tu carrito.
                        </p>
                    </div>
                </div>
                <div
                    class="text-h6 text-right on-left fixed-bottom"
                    style="bottom: 65px"
                    v-if="data[0].cart.length > 0"
                >
                    Sub-total
                    <br />
                    ${{ calculateTotal() }}
                </div>
                <div class="fixed-bottom">
                    <q-btn
                        class="full-width"
                        color="primary"
                        label="Checkout"
                        size="lg"
                        square
                        v-if="
                            data[0].cart.length > 0 &&
                                user.status === 'approved'
                        "
                        @click="
                            $router.push('/checkout')
                            $store.commit('SET_DRAWER', false)
                        "
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
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
        cart() {
            return this.$store.getters.cart
        },
        showDrawer() {
            return this.$store.getters.showDrawer
        },
    },
    data() {
        return {
            mobileDrawer: false,
            drawerRight: false,
            data: [],
            reset: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    watch: {
        cart(newValue, oldValue) {
            if (
                newValue &&
                newValue.length > 0 &&
                this.data.length > 0 &&
                !this.checkIfDuplicate(newValue)
            ) {
                this.data[0].cart.push(newValue[newValue.length - 1])
            }
        },
    },
    methods: {
        checkIfDuplicate(product) {
            let isDuplicate = false
            if (this.cart.length <= 0) {
                isDuplicate = false
            }
            this.cart.forEach(c => {
                if (
                    c.id === product.id &&
                    c.type === product.type &&
                    c.price === product.price
                ) {
                    isDuplicate = true
                }
            })
            return isDuplicate
        },
        addAmountToItem(event) {
            this.displayAlert = false
            this.reset = false
            let itemIndex = 0
            this.data[0].cart.forEach((element, index) => {
                if (element.id === event.item.id) {
                    itemIndex = index
                }
            })
            if (parseInt(event.amount + 1) <= parseInt(event.item.inventory)) {
                event.item.amount += 1
                this.$store.dispatch('AddToAmountInItemCart', event.item)
                api.updateShoppingCart({
                    uid: this.uid,
                    product: event.item,
                    itemIndex: itemIndex,
                }).then(() => {
                    this.reset = true
                })
            } else {
                this.reset = true
                this.alertTitle = 'Hey AWANTA!'
                this.alertMessage =
                    'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
        subtractAmountToItem(event) {
            this.displayAlert = false
            this.reset = false
            let itemIndex = 0
            this.data[0].cart.forEach((element, index) => {
                if (element.id === event.item.id) {
                    itemIndex = index
                }
            })

            if (parseInt(event.amount - 1) > 0) {
                event.item.amount -= 1
                this.$store.dispatch('SubtractToAmountInItemCart', event.item)
                api.updateShoppingCart({
                    uid: this.uid,
                    product: event.item,
                    itemIndex: itemIndex,
                }).then(() => {
                    this.$store.dispatch('UpdateAmountInItemCart', itemIndex)

                    this.reset = true
                })
            } else {
                this.reset = true
                this.alertTitle = 'Hey AWANTA!'
                this.alertMessage =
                    'No podemos dejar el item en 0 mejor eliminalo!'
                this.alertType = 'error'
                this.displayAlert = true
            }
        },
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
            this.reset = false
            this.$store.dispatch('RemoveItemInCart', product)
            try {
                api.removeFromShoppingCart({
                    uid: this.uid,
                    product: product,
                }).then(() => {
                    this.reset = true
                })
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
                },
                error => {}
            )
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
