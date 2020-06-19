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
                                <q-item-section>
                                    <span
                                        ><i class="far fa-user on-left"></i>Mi
                                        cuenta</span
                                    >
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <span
                                    ><i class="fas fa-box-open on-left"></i
                                    >Historial</span
                                >
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section
                                    ><span
                                        ><i
                                            class="fas fa-sign-out-alt on-left"
                                        ></i
                                        >Cerrar sesion</span
                                    ></q-item-section
                                >
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
            class="fixed-right"
        >
            <q-scroll-area class="fit">
                <div class="q-mt-md q-mb-md">
                    <div class="text-h5 text-center">CARRITO DE COMPRAS</div>
                </div>
                <div v-for="(item, i) in 5" :key="i">
                    <q-item clickable ripple>
                        <q-item class="full-width">
                            <q-avatar rounded>
                                <img :src="require('@/assets/beer.jpg')" />
                            </q-avatar>
                            <q-item-section>
                                <span class="on-right"
                                    >Nombre item en venta</span
                                >
                                <span class="on-right">Cant. 35</span>
                            </q-item-section>

                            <q-item-section side>
                                <span class="on-left">$2.50 c/u</span>
                            </q-item-section>
                            <q-item-section side
                                ><i
                                    class="fas fa-times"
                                    style="font-size: 20px;"
                                ></i
                            ></q-item-section>
                        </q-item>
                    </q-item>
                </div>
                <div class="fixed-bottom">
                    <q-btn
                        class="full-width"
                        color="primary"
                        label="Checkout"
                        size="lg"
                        square
                    />
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
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            drawerRight: true,
        }
    },
    methods: {
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>

<style scoped>
@import './../styles/movingbeer.css';
</style>
