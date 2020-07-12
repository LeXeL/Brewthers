<template>
    <div v-if="!!brewerys.length">
        <VueSlickCarousel v-bind="carouselSettings">
            <div v-for="(brewery, i) in brewerys" :key="i">
                <img :src="brewery.photoLocation" width="100%" class="q-pa-md carousel-img" />
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
    computed: {
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    data() {
        return {
            carouselSettings: {
                arrows: false,
                dots: false,
                slidesToShow: 6,
                autoplay: true,
                autoplaySpeed: 2000,
                vertical: true,
                rtl: true,
                responsive: [
                    {
                        breakpoint: 1081,
                        settings: {
                            slidesToShow: 6,
                            vertical: false,
                            rtl: false,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            rtl: false,
                        },
                    },
                ],
            },
        }
    },
    components: {VueSlickCarousel},
}
</script>
