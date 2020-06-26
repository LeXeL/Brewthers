<template>
    <q-header elevated>
        <q-toolbar class="text-white shadow-2" style="background-color: #111">
            <q-btn flat round dense @click="$emit('toggleCart')">
                <i class="fas fa-bars"></i>
            </q-btn>
            <img
                src="@/assets/logo-horizontal.png"
                width="10%"
                class="nav-logo on-right"
                @click="$router.push('/admin')"
            />
            <q-space />
            <q-btn flat round dense>
                <i class="fas fa-user"></i>
                <q-menu content-class="bg-dark">
                    <q-list style="width: 150px; font-family: GilroyExtraBold;">
                        <q-item clickable v-close-popup>
                            <q-item-section @click="$router.push('/movingbeer')">
                                <span>
                                    <i class="fas fa-beer on-left"></i>Movingbeer
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
        </q-toolbar>
    </q-header>
</template>