<template>
    <div class="row q-pa-md">
        <div class="col-lg-3 col-xs-3">
            <q-img :src="data.photoLocation " class="rounded-borders" />
        </div>
        <div class="col-lg-9 q-pl-md">
            <div class="text-h6" style="color: #27a3c3">{{data.name}}</div>
            <div class="text-subtitle-2">Presentacion: {{data.type}}</div>
            <div class="text-subtitle-2" v-if="data.style">Estilo: {{data.style}}</div>
            <div class="text-subtitle-2" v-if="data.abv">ABV: {{data.abv}}%</div>
            <div class="text-subtitle-2" v-if="data.ibu">IBU: {{data.ibu}}</div>
            <div
                class="text-subtitle-2"
                v-if="data.price"
            >Precio unitario: $ {{parseFloat(data.price).toFixed(2) }}</div>
            <div
                class="text-subtitle-2"
                v-if="data.amount && !$route.fullPath.includes('order-details')"
            >Cantidad: {{data.amount}}</div>
            <div
                class="text-subtitle-2"
                v-if="data.amount && $route.fullPath.includes('order-details')"
            >
                Cantidad:
                <i
                    class="fas fa-minus q-mr-sm"
                    style="color: #27a3c3; cursor: pointer;"
                    @click="subtractToAmount(data,data.amount)"
                ></i>
                {{data.amount}}
                <i
                    class="fas fa-plus on-right q-ml-sm"
                    style="color: #27a3c3; cursor: pointer;"
                    @click="addToAmount(data,data.amount)"
                ></i>
            </div>
            <div class="text-subtitle-2" v-if="$route.fullPath.includes('order-details') ">
                <q-btn color="red-7" size="xs" @click="$emit('remove',data)" :disable="disableprop">
                    <i class="fas fa-times"></i>
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            },
        },
        disableprop: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        addToAmount(item, amount) {
            this.$emit('addAmountToItemInCart', {item, amount})
        },
        subtractToAmount(item, amount) {
            this.$emit('subtractAmountToItemInCart', {item, amount})
        },
    },
}
</script>
