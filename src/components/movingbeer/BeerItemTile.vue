<template>
    <div class="q-pa-md text-center">
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div
            class="movingbeer-item"
            style="position: relative;"
            @mouseleave="showAddedOverlay = false"
        >
            <q-img :src="product.photoLocation" class="rounded-borders" />
            <div class="movingbeer-item-overlay q-pa-md" v-if="!showAddedOverlay">
                <div class="q-mb-sm q-mt-lg">Estilo: {{ product.style }}</div>
                <div class="q-mb-sm">ABV: {{ product.abv }}%</div>
                <div class="q-mb-sm">IBU: {{ product.ibu }}</div>
                <div class="q-mb-sm" style="color:#27a3c3; cursor: pointer;">
                    Descripción
                    <q-tooltip content-style="font-size: 16px; width: 250px;">
                        {{
                        product.description
                        }}
                    </q-tooltip>
                </div>
                <q-btn-group class="q-mb-lg" v-if="user.status === 'approved'">
                    <q-btn
                        color="primary"
                        :disable="amount == 0 ? true : false"
                        size="xs"
                        @click="subtractAmount"
                    >
                        <i class="fas fa-minus"></i>
                    </q-btn>
                    <q-btn color="primary" disable>{{ amount }}</q-btn>
                    <q-btn color="primary" size="xs" @click="addAmount">
                        <i class="fas fa-plus"></i>
                    </q-btn>
                </q-btn-group>
                <br />
                <q-btn
                    color="primary"
                    @click="addToCart"
                    :disabled="!amount"
                    v-if="user.status === 'approved'"
                >Agregar</q-btn>
            </div>
            <div class="movingbeer-item-overlay" v-if="showAddedOverlay">
                <div class="text-body-1 absolute-center">
                    <i class="fas fa-check" style="color: #27a3c3"></i> Articulo
                    agregado
                </div>
            </div>
        </div>

        <div class="text-h6 text-center">{{ product.name }}</div>
        <div class="text-subtitle-2 text-center">$ {{ product.price }}</div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    props: {
        product: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
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
    },
    data() {
        return {
            amount: 0,
            showAddedOverlay: false,
            maxlimitreach: false,
            minlimitreach: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
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
        async addToCart() {
            let workingProduct = Object.assign({}, this.product)
            workingProduct.amount = this.amount
            if (this.checkIfDuplicate(workingProduct)) {
                let ItemInCart = {}
                let ItemIndex = 0
                this.cart.filter((c, i) => {
                    if (
                        c.id === workingProduct.id &&
                        c.type === workingProduct.type &&
                        c.price === workingProduct.price
                    ) {
                        ItemInCart = c
                        ItemIndex = i
                    }
                })
                if (
                    parseInt(ItemInCart.amount + workingProduct.amount) <=
                    parseInt(ItemInCart.inventory)
                ) {
                    console.log(
                        `workingProduct amount:${workingProduct.amount} y ItemInCart amount: ${ItemInCart.amount}`
                    )
                    workingProduct.amount =
                        ItemInCart.amount + workingProduct.amount

                    api.updateShoppingCart({
                        uid: this.uid,
                        product: workingProduct,
                        itemIndex: ItemIndex,
                    }).then(async () => {
                        console.log(workingProduct)
                        this.$store.dispatch(
                            'UpdateAmountInItemCart',
                            workingProduct
                        )
                        this.showAddedOverlay = true
                        this.amount = 0
                    })
                } else {
                    this.reset = true
                    this.alertTitle = 'Hey AWANTA! x2'
                    this.alertMessage =
                        'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
                    this.alertType = 'error'
                    this.displayAlert = true
                }
                // this.cart.forEach(async (c, itemIndex) => {
                //     if (
                //         c.id === workingProduct.id &&
                //         c.type === workingProduct.type &&
                //         c.price === workingProduct.price
                //     ) {
                //         console.log(`CART ITEM: ${c}`)
                //         var amount = c.amount
                //         console.log(`product.amount: ${workingProduct.amount}`)
                //         if (
                //             parseInt(c.amount + workingProduct.amount) <=
                //             parseInt(c.inventory)
                //         ) {
                //             workingProduct.amount += amount
                //             api.updateShoppingCart({
                //                 uid: this.uid,
                //                 product: workingProduct,
                //                 itemIndex: itemIndex,
                //             }).then(async () => {
                //                 await this.$store.dispatch(
                //                     'UpdateAmountInItemCart',
                //                     workingProduct
                //                 )
                //                 this.showAddedOverlay = true
                //                 workingProduct.amount = 0
                //                 this.amount = 0
                //             })
                //         } else {
                //             this.reset = true
                //             this.alertTitle = 'Hey AWANTA! x2'
                //             this.alertMessage =
                //                 'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
                //             this.alertType = 'error'
                //             this.displayAlert = true
                //         }
                //     }
                // })
            } else {
                await this.$store.commit('ADD_CART', workingProduct)
                api.addToShoppingCart({uid: this.uid, product: workingProduct})
                    .then(response => {
                        this.showAddedOverlay = true
                    })
                    .catch(error => {
                        this.alertTitle = 'Hey AWANTA!'
                        this.alertMessage =
                            'Hubo un error con tu peticion por favor intentalo mas tarde'
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
                this.amount = 0
            }
        },
        addAmount() {
            this.displayAlert = false
            if (this.amount < this.product.inventory) {
                return this.amount++
            }
            this.alertTitle = 'Hey AWANTA!'
            this.alertMessage =
                'No podemos aumentar tanto tu orden por que no tenemos tanto inventario!'
            this.alertType = 'error'
            this.displayAlert = true
        },
        subtractAmount() {
            if (this.amount > 0) {
                return this.amount--
            }
        },
    },
}
</script>
