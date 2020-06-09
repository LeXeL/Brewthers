<template>
    <q-page>
        <q-toolbar class="text-primary">
            <q-toolbar-title>Moovingbeer</q-toolbar-title>
            <q-btn flat round dense>
                <i class="fas fa-shopping-cart"></i>
            </q-btn>
        </q-toolbar>
        <section class="movingbeer-hero">
            <div class="absolute-center">
                <div class="text-h2">BIENVENIDO A MOOVINGBEER</div>
            </div>
        </section>
        <section class="q-pa-xl">
            <!-- <div class="row">
                <div class="col">
                    <div class="text-h3">Catalogo de Pintas</div>
                </div>
            </div>-->
            <div class="row">
                <div class="col-lg-3" v-for="card in 12" :key="card">
                    <q-card class="my-card q-mb-xl">
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic>
                            <div class="text-subtitle2 text-center full-width full-height">Title</div>
                        </q-img>
                    </q-card>
                </div>
            </div>
        </section>
    </q-page>
</template>
<script>
// VIEWS NEEDED
// Home
// Login
// Display Item
// View / Edit profile
// Shopping Cart
// Checkout
// Order placed
// Orders history
</script>

