<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg">
        <q-header elevated>
            <q-toolbar
                class="text-white shadow-2 desktop-only"
                style="background-color: #111"
            >
                <img
                    src="../assets/logo-horizontal.png"
                    width="10%"
                    class="nav-logo"
                    @click="$router.push('/')"
                />
                <q-space />
                <q-btn flat round dense>
                    <i class="fas fa-user"></i>
                    <q-menu content-class="bg-dark">
                        <q-list
                            style="width: 150px; font-family: GilroyExtraBold;"
                        >
                            <q-item clickable v-close-popup>
                                <q-item-section>Mi cuenta</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>Historial</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section>Cerrar sesion</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn
                    class="on-right"
                    flat
                    round
                    dense
                    @click="drawerRight = !drawerRight"
                >
                    <i class="fas fa-shopping-cart"></i>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
        <q-drawer
            side="right"
            v-model="drawerRight"
            :width="400"
            :breakpoint="500"
            content-class="bg-dark"
        >
            <q-scroll-area class="fit">
                <div class="q-pa-sm">
                    <div class="text-h4">CART DETAILS</div>
                </div>
            </q-scroll-area>
        </q-drawer>
        <footer>
            <div class="row">
                <div class="col-lg-3 col-md-4 desktop-only">
                    <img src="../assets/brewthers-logo.png" width="60%" />
                </div>
                <div class="col-lg-3 col-md-4 q-pr-md">
                    <div class="text-h6" style="font-family: GilroyExtraBold">
                        Navegación
                    </div>
                    <ul>
                        <!-- <li v-for="(link, i) in navLinks" :key="i">
                            <a :href="link.ref" v-smooth-scroll>{{ link.text }}</a>
                        </li>-->
                        <li>
                            <a href="#">terminos & condiciones</a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-4 q-pr-md">
                    <div class="text-h6" style="font-family: GilroyExtraBold">
                        Contáctanos
                    </div>
                    <p style="margin-top: 12px;">
                        Panama, San Francisco, Calle 23 Sur, Torre Something
                        Ofc. 3D
                    </p>
                    <p>(+507) 236-1111</p>
                    <p>correo@brewthersco.com</p>
                </div>
                <div class="col-lg-3 col-md-4 q-pr-md">
                    <div
                        class="text-h6"
                        style="font-family: GilroyExtraBold; margin-bottom: 12px;"
                    >
                        Conectate
                    </div>
                    <a href="#">
                        <i
                            class="fab fa-instagram"
                            style="font-size: 40px;"
                        ></i>
                    </a>
                    <a href="#" class="on-right">
                        <i class="fab fa-facebook" style="font-size: 40px;"></i>
                    </a>
                    <br />
                    <br />
                    <span>
                        {{ new Date().getFullYear() }} &copy; Developed by.
                        <a href="#" style="color: #27a3c3">BlueBaloon Inc.</a>
                    </span>
                </div>
            </div>
        </footer>
    </q-layout>
</template>

<script>
export default {
    data() {
        return {
            drawerRight: false,
        }
    },
}
</script>

<style scoped>
@import './../styles/movingbeer.css';
</style>
