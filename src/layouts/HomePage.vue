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
            <store-title-section></store-title-section>
            <store-content-section></store-content-section>
            <movingbeer-title-section></movingbeer-title-section>
            <faq-section></faq-section>
            <contact-section></contact-section>
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

body {
    background-color: #1f2120;
}

.patternBg {
    background-image: url('../assets/pattern.png');
    height: 910px;
}
>>>>>>> Landing sections created and hero on dev
</style>
