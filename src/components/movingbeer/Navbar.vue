<template>
    <q-header elevated>
        <q-toolbar class="text-white shadow-2" style="background-color: #111">
            <img
                src="@/assets/logo-horizontal.png"
                width="10%"
                class="nav-logo desktop-only"
                @click="$router.push('/movingbeer')"
            />
            <img
                src="@/assets/logo-horizontal.png"
                width="30%"
                class="nav-logo mobile-only"
                @click="$router.push('/movingbeer')"
            />
            <q-space />
            <q-btn flat round dense v-if="user">
                <i class="fas fa-user"></i>
                <q-menu content-class="bg-dark">
                    <q-list style="width: 150px; font-family: GilroyExtraBold;">
                        <q-item clickable v-close-popup>
                            <q-item-section @click="$router.push('/mi-cuenta')">
                                <span>
                                    <i class="fas fa-user on-left"></i>Mi cuenta
                                </span>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup v-if="user.role === 'admin'">
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
                            <q-item-section @click="logout()">
                                <span>
                                    <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                                </span>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
            <q-btn class="on-right" flat round dense @click="$emit('toggleCart')" v-if="user">
                <i class="fas fa-shopping-cart"></i>
            </q-btn>
            <q-btn class="on-right" color="primary" :to="'/login'" v-if="!user">iniciar sesión</q-btn>
        </q-toolbar>
    </q-header>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
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
