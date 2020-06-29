<template>
    <div>
        <VueSlickCarousel v-bind="carouselSettings">
            <div v-for="(logo, i) in brands" :key="i">
                <img
                    :src="require(`@/assets/familia-brewthers/${logo}`)"
                    width="100%"
                    class="q-pa-md carousel-img"
                />
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
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
            brands: [
                '2-oceans.png',
                'back-yard.png',
                'boquete-brewing.png',
                'buena-vista.png',
                'casa-bruja.png',
                'central.png',
                'la-murga.png',
                'rana-dorada.png',
                'tres-gatos.png',
            ],
        }
    },
    components: {VueSlickCarousel},
}
</script>
