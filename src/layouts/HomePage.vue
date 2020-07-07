<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg">
        <navbar-section />
        <q-page-container>
            <hero-section id="hero"></hero-section>
            <carousel-section class="mobile-only"></carousel-section>
            <us-title-section id="title" @toggleSection="toggleSection('us')"></us-title-section>
            <q-slide-transition>
                <div v-show="usSection">
                    <us-content-section id="uscontent" @toggleSection="toggleSection('us')"></us-content-section>
                </div>
            </q-slide-transition>
            <blog-title-section id="blog"></blog-title-section>
            <store-title-section id="tienditatitle" @toggleSection="toggleSection('tiendita')"></store-title-section>
            <q-slide-transition>
                <div v-show="tienditaSection">
                    <store-content-section
                        id="tienditacontent"
                        @toggleSection="toggleSection('tiendita')"
                        @setContactReason="contactReason = !contactReason"
                    ></store-content-section>
                </div>
            </q-slide-transition>
            <movingbeer-title-section id="movingbeer"></movingbeer-title-section>
            <faq-section id="faq"></faq-section>
            <contact-section id="contact" :reason="contactReason"></contact-section>
            <footer-section :page="'landing'" />
        </q-page-container>
    </q-layout>
</template>

<script>
//Sections
import HeroSection from '@/views/landing/HeroSection'
import UsTitleSection from '@/views/landing/UsTitleSection'
import UsContentSection from '@/views/landing/UsContentSection'
import BlogTitleSection from '@/views/landing/BlogTitleSection'
import StoreTitleSection from '@/views/landing/StoreTitleSection'
import StoreContentSection from '@/views/landing/StoreContentSection'
import MovingbeerTitleSection from '@/views/landing/MovingbeerTitleSection'
import FaqSection from '@/views/landing/FaqSection'
import ContactSection from '@/views/landing/ContactSection'
import CarouselSection from '@/views/landing/CarouselSection'

//Components
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/general/Footer'

export default {
    data() {
        return {
            usSection: false,
            tienditaSection: false,
            dialog: false,
            contactReason: true,
        }
    },
    methods: {
        toggleSection(section) {
            if (section === 'us') this.usSection = !this.usSection
            if (section === 'tiendita')
                this.tienditaSection = !this.tienditaSection
        },
        contact() {
            console.log('Comprar caja o keg')
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
        'carousel-section': CarouselSection,
        'navbar-section': Navbar,
        'footer-section': Footer,
    },
}
</script>

<style scoped>
@import './../styles/landing.css';
</style>
