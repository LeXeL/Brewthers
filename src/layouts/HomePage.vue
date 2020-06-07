<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar
                class="text-white shadow-2 desktop-only"
                style="background-color: #111"
            >
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-tabs class="brewthers-nav">
                    <a
                        v-for="(navlink, i) in navLinks"
                        :href="navlink.ref"
                        :key="i"
                        v-smooth-scroll
                    >
                        <q-tab :name="navlink.name">
                            <span>{{ navlink.text }}</span>
                        </q-tab>
                    </a>
                    <q-btn
                        color="primary"
                        text-color="black"
                        label="iniciar sesión"
                    />
                </q-tabs>
            </q-toolbar>
            <q-toolbar
                class="text-white shadow-2 mobile-only"
                style="background-color: #111"
            >
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-btn flat round dense @click="dialog = true">
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
                                <i class="fas fa-times"></i>
                            </a>
                        </li>
                        <li v-for="(navlink, i) in navLinks" :key="i">
                            <a :href="navlink.ref" @click="dialog = false">{{
                                navlink.text
                            }}</a>
                        </li>
                        <li>
                            <a href="http://google.com" @click="dialog = false"
                                >iniciar sesion</a
                            >
                        </li>
                        <li class="q-mt-md">
                            <a href="#" @click="dialog = false">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a
                                href="#"
                                class="on-right"
                                @click="dialog = false"
                            >
                                <i class="fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-page-container>
            <hero-section id="hero"></hero-section>
            <us-title-section
                id="title"
                @openSection="toggleUsSection()"
            ></us-title-section>
            <q-slide-transition>
                <div v-show="usSection">
                    <us-content-section
                        id="uscontent"
                        @openSection="toggleUsSection()"
                    ></us-content-section>
                </div>
            </q-slide-transition>
            <blog-title-section id="blog"></blog-title-section>
            <!-- <store-title-section></store-title-section> -->
            <!-- <store-content-section></store-content-section> -->
            <movingbeer-title-section
                id="movingbeer"
            ></movingbeer-title-section>
            <faq-section id="faq"></faq-section>
            <contact-section id="contact"></contact-section>
            <footer>
                <div class="row">
                    <div class="col-lg-3 col-md-4 desktop-only">
                        <img src="../assets/brewthers-logo.png" width="60%" />
                    </div>
                    <div class="col-lg-3 col-md-4 q-pr-md">
                        <div
                            class="text-h6"
                            style="font-family: GilroyExtraBold"
                        >
                            Navegación
                        </div>
                        <ul>
                            <li v-for="(link, i) in navLinks" :key="i">
                                <a :href="link.ref" v-smooth-scroll>{{
                                    link.text
                                }}</a>
                            </li>
                            <li>
                                <a href="#">terminos y condiciones</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-md-4 q-pr-md">
                        <div
                            class="text-h6"
                            style="font-family: GilroyExtraBold"
                        >
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
                            <i
                                class="fab fa-facebook"
                                style="font-size: 40px;"
                            ></i>
                        </a>
                        <br />
                        <br />
                        <span>
                            {{ new Date().getFullYear() }} &copy; Developed by.
                            <a href="#" style="color: #27a3c3"
                                >BlueBaloon Inc.</a
                            >
                        </span>
                    </div>
                </div>
            </footer>
        </q-page-container>
    </q-layout>
</template>

<script>
import HeroSection from '@/views/landing/HeroSection.vue'
import UsTitleSection from '@/views/landing/UsTitleSection.vue'
import UsContentSection from '@/views/landing/UsContentSection.vue'
import BlogTitleSection from '@/views/landing/BlogTitleSection.vue'
import StoreTitleSection from '@/views/landing/StoreTitleSection.vue'
import StoreContentSection from '@/views/landing/StoreContentSection.vue'
import MovingbeerTitleSection from '@/views/landing/MovingbeerTitleSection.vue'
import FaqSection from '@/views/landing/FaqSection.vue'
import ContactSection from '@/views/landing/ContactSection.vue'

export default {
    data() {
        return {
            usSection: false,
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
                    ref: '#',
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
        toggleUsSection() {
            this.usSection = !this.usSection
        },
    },
    components: {
        'hero-section': HeroSection,
        'us-title-section': UsTitleSection,
        'us-content-section': UsContentSection,
        'blog-title-section': BlogTitleSection,
        'store-title-section': StoreTitleSection,
        'store-content-section': StoreContentSection,
        'movingbeer-title-section': MovingbeerTitleSection,
        'faq-section': FaqSection,
        'contact-section': ContactSection,
    },
}
</script>

<style scoped>
@import './../styles/landing.css';
</style>
