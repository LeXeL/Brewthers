<template>
    <div class="q-pa-md text-center">
        <div class="movingbeer-item" style="position: relative;">
            <q-img :src="require(`@/assets/beer.jpg`)" class="rounded-borders" />
            <div class="movingbeer-item-overlay q-pa-md">
                <div class="text-subtitle-2 q-mb-sm q-mt-lg">Estilo: Something</div>
                <div class="text-subtitle-2 q-mb-sm">Alcohol: 5%</div>
                <div class="text-subtitle-2 q-mb-lg">IBU: 500</div>
                <q-btn-group class="q-mb-lg">
                    <q-btn color="primary" size="xs">
                        <i class="fas fa-minus"></i>
                    </q-btn>
                    <q-btn color="primary" disable>10</q-btn>
                    <q-btn color="primary" size="xs">
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
