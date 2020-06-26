<template>
    <q-header elevated>
        <q-toolbar class="text-white shadow-2" style="background-color: #111">
            <img
                src="@/assets/logo-horizontal.png"
                width="10%"
                class="nav-logo"
                @click="$router.push('/movingbeer')"
            />
            <q-space />
            <q-btn flat round dense>
                <i class="fas fa-user"></i>
                <q-menu content-class="bg-dark">
                    <q-list style="width: 150px; font-family: GilroyExtraBold;">
                        <q-item clickable v-close-popup>
                            <q-item-section @click="$router.push('/mi-cuenta')">
                                <span>
                                    <i class="far fa-user on-left"></i>Mi
                                    cuenta
                                </span>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section @click="$router.push('/admin')">
                                <span>
                                    <i class="fas fa-user-shield on-left"></i>Admin
                                </span>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section @click="$router.push('/historial')">
                                <span>
                                    <i class="fas fa-box-open on-left"></i>Historial
                                </span>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section>
                                <span>
                                    <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                                </span>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
            <q-btn
                class="on-right"
                flat
                round
                dense
                @click="$emit('toggleCart')"
                v-if="$route.fullPath != '/checkout'"
            >
                <i class="fas fa-shopping-cart"></i>
            </q-btn>
        </q-toolbar>
    </q-header>
</template>
