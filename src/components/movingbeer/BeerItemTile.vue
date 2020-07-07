<template>
    <div class="q-pa-md text-center">
        <div class="movingbeer-item" style="position: relative;">
            <q-img :src="require(`@/assets/beer.jpg`)" class="rounded-borders" />
            <div class="movingbeer-item-overlay q-pa-md">
                <div class="q-mb-sm q-mt-lg">Estilo: Something</div>
                <div class="q-mb-sm">ABV: 5%</div>
                <div class="q-mb-sm">IBU: 500</div>
                <div class="q-mb-sm" style="color:#27a3c3; cursor: pointer;">
                    Descripción
                    <q-tooltip content-style="font-size: 13px; width: 250px;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In risus justo, rutrum ut purus venenatis, sodales
                        efficitur eros.
                    </q-tooltip>
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
        </div>

        <div class="text-h6 text-center">Nombre</div>
        <div class="text-subtitle-2 text-center">$ 50.00</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            amount: 0,
        }
    },
}
</script>
