<template>
    <div class="row q-pa-md">
        <div class="col-lg-3">
            <q-img :src="require('@/assets/beer.jpg')" class="rounded-borders" />
        </div>
        <div class="col-lg-9 q-pl-md">
            <div class="text-h6" style="color: #27a3c3">Item Name</div>
            <div class="text-subtitle-2">Presentacion: KEG</div>
            <div
                class="text-subtitle-2"
                v-if="$route.fullPath.includes('checkout')"
            >Estilo: Something</div>
            <div class="text-subtitle-2" v-if="$route.fullPath.includes('checkout')">Alcohol: 5%</div>
            <div class="text-subtitle-2" v-if="$route.fullPath.includes('checkout')">IBU: 150</div>
            <div class="text-subtitle-2">Precio unitario: $ 5.50</div>
            <div class="text-subtitle-2">Cantidad: 10</div>
        </div>
    </div>
</template>