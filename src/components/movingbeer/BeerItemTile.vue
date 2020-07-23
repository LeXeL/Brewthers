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
                <q-btn-group class="q-mb-lg">
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
                <q-btn color="primary" @click="addToCart" :disabled="!amount">Agregar</q-btn>
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
        uid() {
            return this.$store.getters.uid
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
        addToCart() {
            this.showAddedOverlay = true
            this.product.amount = this.amount
            api.addToShoppingCart({uid: this.uid, product: this.product})
                .then(response => {
                    this.amount = 0
                })
                .catch(error => {
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
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
