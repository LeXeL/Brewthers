<template>
    <div class="row q-pa-md">
        <div class="col-lg-3 col-xs-3">
            <q-img :src="require('@/assets/beer.jpg')" class="rounded-borders" />
        </div>
        <div class="col-lg-9 q-pl-md">
            <div class="text-h6" style="color: #27a3c3">Item Name</div>
            <div class="text-subtitle-2">Presentacion: KEG</div>
            <div
                class="text-subtitle-2"
                v-if="style.some(el => $route.fullPath.includes(el))"
            >Estilo: Something</div>
            <div class="text-subtitle-2" v-if="abv.some(el => $route.fullPath.includes(el))">ABV: 5%</div>
            <div
                class="text-subtitle-2"
                v-if="ibu.some(el => $route.fullPath.includes(el))"
            >IBU: 150</div>
            <div
                class="text-subtitle-2"
                v-if="price.some(el => $route.fullPath.includes(el))"
            >Precio unitario: $ 5.50</div>
            <div
                class="text-subtitle-2"
                v-if="amount.some(el => $route.fullPath.includes(el))"
            >Cantidad: 10</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            style: ['checkout', 'historial'],
            abv: ['checkout', 'historial'],
            ibu: ['checkout', 'historial'],
            price: ['checkout', 'order-details'],
            amount: ['checkout', 'order-details'],
        }
    },
}
</script>
