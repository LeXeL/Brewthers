<template>
    <div>
        <q-header elevated>
            <q-toolbar
                class="text-white shadow-2 desktop-only"
                style="background-color: #111"
            >
                <img
                    src="@/assets/logo-horizontal.png"
                    width="10%"
                    class="nav-logo"
                    @click="scrollToTop"
                />

                <q-space />
                <q-tabs class="brewthers-nav">
                    <a
                        v-for="(navlink, i) in navLinks"
                        :href="navlink.ref"
                        :key="i"
                        v-smooth-scroll
                        style="text-decoration: none;"
                    >
                        <q-tab :name="navlink.name" class="text-white">
                            <span>{{ navlink.text }}</span>
                        </q-tab>
                    </a>
                </q-tabs>
                <q-space />
                <q-btn class="on-right" color="primary" :to="'/login'"
                    >iniciar sesión</q-btn
                >
            </q-toolbar>
            <q-toolbar
                class="text-white shadow-2 mobile-only"
                style="background-color: #111"
            >
                <img src="@/assets/logo-horizontal.png" width="30%" />
                <q-space />
                <q-btn flat round dense @click="dialog = !dialog">
                    <i class="fas fa-bars" style="color: #27a3c3 "></i>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-dialog
            v-model="dialog"
            persistent
            maximized
            transition-show="slide-left"
            transition-hide="slide-right"
        >
            <q-card dark class="text-white" style="background-color: #111">
                <q-card-section class="mobile-menu-overlay">
                    <ul class="q-mr-md">
                        <li class="q-pb-lg">
                            <a href="#" @click="dialog = false">
                                <i class="fas fa-times text-white"></i>
                            </a>
                        </li>
                        <li v-for="(navlink, i) in navLinks" :key="i">
                            <a
                                class="text-white"
                                :href="navlink.ref"
                                @click="dialog = false"
                            >
                                {{ navlink.text }}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/login"
                                @click="dialog = false"
                                class="text-white"
                                >iniciar sesion</a
                            >
                        </li>
                        <li class="q-mt-md">
                            <a href="#" @click="dialog = false">
                                <i class="fab fa-facebook text-white"></i>
                            </a>
                            <a
                                href="#"
                                class="on-right"
                                @click="dialog = false"
                            >
                                <i class="fab fa-instagram text-white"></i>
                            </a>
                        </li>
                    </ul>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            navLinks: [
                {
                    text: 'inicio',
                    ref: '#hero',
                    name: 'tab1',
                },
                {
                    text: 'nosotros',
                    ref: '#title',
                    name: 'tab2',
                },
                {
                    text: 'blog',
                    ref: '#blog',
                    name: 'tab3',
                },
                {
                    text: 'tiendita',
                    ref: '#tienditatitle',
                    name: 'tab4',
                },
                {
                    text: 'movingbeer',
                    ref: '#movingbeer',
                    name: 'tab5',
                },
                {
                    text: 'faq',
                    ref: '#faq',
                    name: 'tab6',
                },
                {
                    text: 'contáctanos',
                    ref: '#contact',
                    name: 'tab7',
                },
            ],
        }
    },
    methods: {
        scrollToTop() {
            const c =
                document.documentElement.scrollTop || document.body.scrollTop
            if (c > 0) {
                window.requestAnimationFrame(this.scrollToTop)
                window.scrollTo(0, c - c / 8)
            }
        },
    },
}
</script>
