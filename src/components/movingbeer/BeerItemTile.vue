<template>
    <div class="q-pa-md text-center">
        <div class="movingbeer-item" style="position: relative;">
            <q-img :src="product.photoLocation" />
            <div class="movingbeer-item-overlay q-pa-md">
                <div class="q-mb-sm q-mt-lg">Estilo: {{product.style}}</div>
                <div class="q-mb-sm">ABV: {{product.abv}}%</div>
                <div class="q-mb-sm">IBU: {{product.ibu}}</div>
                <div class="q-mb-sm" style="color:#27a3c3; cursor: pointer;">
                    Descripción
                    <q-tooltip
                        content-style="font-size: 16px; width: 250px;"
                    >{{product.description}}</q-tooltip>
                </div>
                <q-btn-group class="q-mb-lg">
                    <q-btn color="primary" size="xs" @click="amount--">
                        <i class="fas fa-minus"></i>
                    </q-btn>
                    <q-btn color="primary" disable>{{ amount }}</q-btn>
                    <q-btn color="primary" size="xs" @click="amount++">
                        <i class="fas fa-plus"></i>
                    </q-btn>
                </q-btn-group>
                <br />
                <q-btn color="primary">Agregar</q-btn>
            </div>
            <!-- <div class="movingbeer-item-overlay">
                <div class="text-body-1 absolute-center">
                    <i class="fas fa-check" style="color: #27a3c3"></i> Articulo
                    agregado
                </div>
            </div>-->
            <!-- {"style":"style 2",
            "description":"asdasdasd",
            "inventory":0,
            "type":"KEG",
            "status":"active",
            "name":"Prueba",
            "photoLocation":"https://firebasestorage.googleapis.com/v0/b/brewthers-374c0.appspot.com/o/products%2FLa%20Murga%2FPrueba%2FPrueba?alt=media&token=1cdcfeb8-e992-488b-b1ca-352d22df7d8e",
            "ibu":"123",
            "brewery":"7TtGmy9E0JTaTRPU68GW",
            "price":"123",
            "abv":"122",
            "id":"Nn95wsfITZAIWrdA1Fha"}-->
        </div>

        <div class="text-h6 text-center">{{product.name}}</div>
        <div class="text-subtitle-2 text-center">$ {{product.price}}</div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            amount: 0,
        }
    },
}
</script>
