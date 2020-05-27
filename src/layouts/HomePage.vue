<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Quasar App</q-toolbar-title>
                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <hero-section></hero-section>
            <us-title-section></us-title-section>
            <us-content-section></us-content-section>
            <blog-title-section></blog-title-section>
            <!-- <store-title-section></store-title-section>
            <store-content-section></store-content-section>
            <movingbeer-title-section></movingbeer-title-section>
            <faq-section></faq-section>
            <contact-section></contact-section>-->
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
</style>
