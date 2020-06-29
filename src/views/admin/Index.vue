<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Bienvenido, Fulanito</div>
        <div class="row q-mb-lg">
            <div class="col-lg-3 q-pa-md">
                <q-card flat bordered dark class="full-width">
                    <q-card-section>
                        <div class="text-h6">Ordenes abiertas</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h5">5</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-3 q-pa-md">
                <q-card flat bordered dark class="full-width">
                    <q-card-section>
                        <div class="text-h6">Solicitudes abiertas</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h5">3</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-3 q-pa-md">
                <q-card flat bordered dark class="full-width">
                    <q-card-section>
                        <div class="text-h6">Usuarios activos</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h5">15</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <q-card class="full-width" flat bordered dark>
                    <q-card-section>
                        <div class="text-h6">Ordenes recientes</div>
                    </q-card-section>
                    <q-list dark bordered separator>
                        <q-item clickable v-ripple v-for="(order, i) in 7" :key="i">
                            <q-item-section>
                                <q-item-label>Nombre del restaurante</q-item-label>
                                <q-item-label caption>No. 15648</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-card class="full-width" flat bordered dark>
                    <q-card-section>
                        <div class="text-h6">Solicitudes recientes</div>
                    </q-card-section>
                    <q-list dark bordered separator>
                        <q-item clickable v-ripple v-for="(order, i) in 7" :key="i">
                            <q-item-section>
                                <q-item-label>Nombre del restaurante</q-item-label>
                                <q-item-label caption>correo.restaurante@gmail.com</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
            <!-- <div class="col-lg-4 q-pa-md">
                        <q-card class="full-width" flat bordered dark>
                            <q-card-section>
                                <div class="text-h6">Cambios en inventario</div>
                            </q-card-section>
                            <q-list dark bordered separator>
                                <q-item clickable v-ripple v-for="(order, i) in 7" :key="i">
                                    <q-item-section>
                                        <q-item-label>Nombre del restaurante</q-item-label>
                                        <q-item-label caption>No. 15648</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card>
            </div>-->
        </div>
    </div>
</template>