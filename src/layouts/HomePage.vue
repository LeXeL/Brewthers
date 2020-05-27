<template>
    <q-layout view="lHh Lpr lFf">
        <div class="q-pt-md" id="mobile-menu-overlay">
            <ul class="q-mt-xl q-mr-md">
                <li>
                    <a href="#">inicio</a>
                </li>
                <li>
                    <a href="#">nosotros</a>
                </li>
                <li>
                    <a href="#">blog</a>
                </li>
                <li>
                    <a href="#">tiendita</a>
                </li>
                <li>
                    <a href="#">contactanos</a>
                </li>
                <li>
                    <a href="#">movingbeer</a>
                </li>
                <li>
                    <a href="#">faq</a>
                </li>
                <li class="q-mt-xl">
                    <a href="#">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" class="on-right">
                        <i class="fab fa-instagram"></i>
                    </a>
                </li>
            </ul>
            <button @click="hideMobileMenu">Close</button>
        </div>
        <q-header elevated>
            <q-toolbar class="text-white shadow-2 desktop-only" style="background-color: #111">
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-tabs class="brewthers-nav">
                    <q-tab name="tab1" label="Inicio" />
                    <q-tab name="tab2" label="Nosotros" />
                    <q-tab name="tab4" label="Blog" />
                    <q-tab name="tab5" label="Tiendita" />
                    <q-tab name="tab6" label="Contactanos" />
                    <q-tab name="tab7" label="MovingBeer" />
                    <q-tab name="tab8" label="FAQ" />
                    <q-tab name="tab9">
                        <i class="fab fa-facebook"></i>
                    </q-tab>
                    <q-tab name="tab10">
                        <i class="fab fa-instagram"></i>
                    </q-tab>
                </q-tabs>
            </q-toolbar>
            <q-toolbar class="text-white shadow-2 mobile-only" style="background-color: #111">
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-btn flat round dense @click="showMobileMenu">
                    <i class="fas fa-bars" style="color: #27a3c3 "></i>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <hero-section></hero-section>
            <us-title-section></us-title-section>
            <us-content-section></us-content-section>
            <blog-title-section></blog-title-section>
            <!-- <store-title-section></store-title-section> -->
            <!-- <store-content-section></store-content-section> -->
            <movingbeer-title-section></movingbeer-title-section>
            <faq-section></faq-section>
            <!-- <contact-section></contact-section> -->
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
    methods: {
        showMobileMenu() {
            document.getElementById('mobile-menu-overlay').style.display =
                'block'
        },
        hideMobileMenu() {
            document.getElementById('mobile-menu-overlay').style.display =
                'none'
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

<style>
* {
    color: #fff;
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
}

.us-bg {
    background-image: url('../assets/us-bg.png');
    background-position: center;
    height: 1080px;
}

.title-section {
    font-family: GilroyExtraBold;
    text-transform: uppercase;
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
}

.movingbeer-bg {
    background-image: url('../assets/movingbeer-bg.png');
    background-position: center;
    height: 1080px;
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

#mobile-menu-overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}
#mobile-menu-overlay a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: GilroyExtraBold;
}

#mobile-menu-overlay a:hover {
    color: #27a3c3;
}

#mobile-menu-overlay ul {
    list-style-type: none;
    text-align: right;
    font-size: 30px;
}

#mobile-menu-overlay li {
    margin-bottom: 10px;
}
</style>
