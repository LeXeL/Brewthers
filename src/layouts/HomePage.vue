<template>
    <q-layout view="lHh Lpr lFf">
        <div id="mobile-menu-overlay" @click="mobileMenu = false">
            <ul class="q-mt-xl q-pt-xl q-mr-md">
                <!-- <li class="q-pb-xl">
                    <a href="#" @click="hideMobileMenu">
                        <i class="fas fa-times"></i>
                    </a>
                </li>-->
                <li>
                    <a href="#hero" v-smooth-scroll @click="mobileMenu = false">inicio</a>
                </li>
                <li>
                    <a href="#title" v-smooth-scroll @click="mobileMenu = false">nosotros</a>
                </li>
                <li>
                    <a href="#blog" v-smooth-scroll @click="mobileMenu = false">blog</a>
                </li>
                <li>
                    <a href="#" v-smooth-scroll @click="mobileMenu = false">tiendita</a>
                </li>
                <li>
                    <a href="#movingbeer" v-smooth-scroll @click="mobileMenu = false">movingbeer</a>
                </li>
                <li>
                    <a href="#faq" @click="mobileMenu = false">faq</a>
                </li>
                <li>
                    <a href="#contact" v-smooth-scroll @click="mobileMenu = false">contactanos</a>
                </li>
                <li class="q-mt-xl">
                    <a href="#" @click="mobileMenu = false">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" class="on-right" @click="mobileMenu = false">
                        <i class="fab fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>
        <q-header elevated>
            <q-toolbar class="text-white shadow-2 desktop-only" style="background-color: #111">
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-tabs class="brewthers-nav">
                    <q-tab name="tab1">
                        <a href="#hero" v-smooth-scroll>Inicio</a>
                    </q-tab>
                    <q-tab name="tab2">
                        <a href="#title" v-smooth-scroll>Nosotros</a>
                    </q-tab>
                    <q-tab name="tab3">
                        <a href="#blog" v-smooth-scroll>Blog</a>
                    </q-tab>
                    <q-tab name="tab4">
                        <a href="#" v-smooth-scroll>Tiendita</a>
                    </q-tab>
                    <q-tab name="tab5">
                        <a href="#movingbeer" v-smooth-scroll>MovingBeer</a>
                    </q-tab>
                    <q-tab name="tab6">
                        <a href="#faq" v-smooth-scroll>FAQ</a>
                    </q-tab>
                    <q-tab name="tab7">
                        <a href="#contact" v-smooth-scroll>Contactanos</a>
                    </q-tab>
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
                <q-btn flat round dense @click="mobileMenu = !mobileMenu">
                    <i class="fas fa-bars" style="color: #27a3c3 "></i>
                </q-btn>
            </q-toolbar>
        </q-header>

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
            mobileMenu: false,
        }
    },
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
    watch: {
        mobileMenu() {
            if (this.mobileMenu) this.showMobileMenu()
            else this.hideMobileMenu()
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
    height: 800px;
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
    background-color: rgba(0, 0, 0, 0.85); /* Black background with opacity */
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
</style>
