<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Bienvenido, Fulanito</div>
        <div class="row q-mb-lg">
            <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-md">
                <q-card flat dark class="full-width bg-grey-9">
                    <q-card-section>
                        <div class="text-h6">
                            <i class="fas fa-box-open text-amber-9"></i> Ordenes abiertas
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h3">5</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-md">
                <q-card flat dark class="full-width bg-grey-9">
                    <q-card-section>
                        <div class="text-h6">
                            <i class="fas fa-dolly text-info"></i> Ordenes completadas (mes)
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h3">3</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-md">
                <q-card flat dark class="full-width bg-grey-9">
                    <q-card-section>
                        <div class="text-h6">
                            <i class="fas fa-dollar-sign text-secondary"></i> Vendido (mes)
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h3">$ 155.63</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-md">
                <q-card flat dark class="full-width bg-grey-9">
                    <q-card-section>
                        <div class="text-h6">
                            <i class="fas fa-user text-lime-8"></i> Solicitudes pendientes
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h3">3</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                <q-card class="full-width" flat dark>
                    <q-item>
                        <q-item-section>
                            <div class="text-h6" size="xs">Ordenes recientes</div>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="secondary" size="sm" to="/orders-manager">
                                <i class="fas fa-angle-double-right"></i>
                            </q-btn>
                        </q-item-section>
                    </q-item>

                    <q-list dark bordered>
                        <q-item clickable v-ripple v-for="(order, i) in 10" :key="i">
                            <q-item-section>
                                <q-item-label>Nombre del restaurante</q-item-label>
                                <q-item-label caption>No. 15648</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
            <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                <q-card class="full-width" flat dark>
                    <q-item>
                        <q-item-section>
                            <div class="text-h6" size="xs">Solicitudes recientes</div>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="secondary" size="sm" to="/accounts-manager">
                                <i class="fas fa-angle-double-right"></i>
                            </q-btn>
                        </q-item-section>
                    </q-item>
                    <q-list dark bordered>
                        <q-item clickable v-ripple v-for="(order, i) in 10" :key="i">
                            <q-item-section>
                                <q-item-label>Nombre del restaurante</q-item-label>
                                <q-item-label caption>correo.restaurante@gmail.com</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </div>
        </div>
    </div>
</template>