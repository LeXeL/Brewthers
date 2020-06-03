<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="text-white shadow-2 desktop-only" style="background-color: #111">
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
                    <q-tab name="tab8">
                        <i class="fab fa-facebook"></i>
                    </q-tab>
                    <q-tab name="tab9">
                        <i class="fab fa-instagram"></i>
                    </q-tab>
                </q-tabs>
            </q-toolbar>
            <q-toolbar class="text-white shadow-2 mobile-only" style="background-color: #111">
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
                            <a :href="navlink.ref" @click="dialog = false">{{ navlink.text }}</a>
                        </li>
                        <li class="q-mt-xl">
                            <a href="#" @click="dialog = false">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="#" class="on-right" @click="dialog = false">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-page-container>
            <hero-section id="hero"></hero-section>
            <us-title-section id="title"></us-title-section>
            <us-content-section id="uscontent"></us-content-section>
            <blog-title-section id="blog"></blog-title-section>
            <!-- <store-title-section></store-title-section> -->
            <!-- <store-content-section></store-content-section> -->
            <movingbeer-title-section id="movingbeer"></movingbeer-title-section>
            <faq-section id="faq"></faq-section>
            <contact-section id="contact"></contact-section>
            <footer>
                Brewthers Co.
                {{ new Date().getFullYear() }}
                <span>&copy;</span> Desarrollado por
                <a href="#" target="_blank">
                    <span>BlueBalloon Inc.</span>
                </a>
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
                    text: 'contactanos',
                    ref: '#contact',
                    name: 'tab7',
                },
            ],
        }
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

<style>
* {
    color: #fff;
    text-decoration: none;
}

@font-face {
    font-family: GilroyExtraBold;
    src: url('../assets/Gilroy-ExtraBold.otf');
}
@font-face {
    font-family: GilroyLight;
    src: url('../assets/Gilroy-Light.otf');
}

body {
    background-color: #1f2120;
}

q-toolbar a {
    text-decoration: none !important;
}

.brewthers-nav {
    font-family: GilroyExtraBold !important;
}

.q-tab__indicator {
    background-color: #27a3c3 !important;
}

.pattern-bg {
    background-image: url('../assets/pattern.png');
    height: 910px;
    background-position: center;
    background-repeat: no-repeat;
}

.hero-stripes {
    width: 20px;
    height: 930px;
    background-color: #27a3c3;
    position: absolute;
    bottom: 0;
}

.us-bg {
    background-image: url('../assets/us-bg.png');
    background-position: center center;
    height: 1080px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.title-section {
    font-family: GilroyExtraBold;
    text-transform: uppercase;
    font-size: 3rem;
}

.title-section-link {
    font-family: GilroyLight;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
}

.title-section-link:hover {
    color: #27a3c3;
}

.us-content {
    text-align: center;
    font-family: GilroyLight;
}

.us-content p {
    width: 100%;
    font-size: 20px;
}

.us-partner-tile {
    text-align: center;
    font-family: GilroyExtraBold;
    font-size: 25px;
}

.blog-bg {
    background-image: url('../assets/blog-bg.png');
    background-position: center;
    height: 1080px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.movingbeer-bg {
    background-image: url('../assets/movingbeer-bg.png');
    background-position: center;
    height: 1080px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.faq-section {
    padding: 20px 10%;
    font-family: GilroyExtraBold;
}

.faq-section h5 {
    margin-bottom: 15px;
    margin-top: 15px;
}

.faq-section h5:hover {
    cursor: pointer;
    color: #27a3c3;
}

.faq-section p {
    font-family: GilroyLight;
    font-size: 1.15rem;
}

.faq-section div {
    margin-bottom: 25px;
}

.contact-form {
    padding: 20px 10%;
}

@media only screen and (max-width: 600px) {
    .us-bg,
    .blog-bg,
    .movingbeer-bg {
        height: 650px;
    }
}

.mobile-menu-overlay a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: GilroyExtraBold;
}

.mobile-menu-overlay a:hover {
    color: #27a3c3;
}

.mobile-menu-overlay ul {
    list-style-type: none;
    text-align: right;
    font-size: 30px;
    margin-top: 0;
}

.mobile-menu-overlay li {
    margin-bottom: 10px;
}

footer {
    background-color: #111;
    padding: 10px;
    text-align: center;
    font-family: GilroyLight;
    font-size: 12px;
}

footer span {
    color: #27a3c3;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
    background: #111;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #27a3c3;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #27a3c3;
}
</style>
