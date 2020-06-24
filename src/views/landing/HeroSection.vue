<template>
    <div style="position: relative">
        <div class="hero-stripes desktop-only" style="left: 50px;"></div>
        <div class="hero-stripes desktop-only" style="left: 90px;"></div>
        <div class="hero-stripes desktop-only" style="left: 130px;"></div>

        <!-- TEST -->
        <div class="pattern-bg desktop-only" style="background-size: cover; height: 930px;">
            <div class="absolute-center row justify-center">
                <div class="row">
                    <div class="col"></div>
                    <div class="col-lg-7 col-md-9 col-sm-12 col-xs-12">
                        <img class="q-mb-xl" src="@/assets/brewthers-logo.png" width="100%" />
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="text-h4" style="text-align: center;">
                            Somos el punto de conexión entre ustedes y las buenas
                            cervezas artesanales panameñas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pattern-bg mobile-only" style="background-size: cover; height: 600px;">
            <div class="absolute-center row justify-center">
                <div class="row">
                    <div class="col"></div>
                    <div class="col-lg-7 col-md-9 col-sm-12 col-xs-12">
                        <img class="q-mb-xl" src="@/assets/brewthers-logo.png" width="100%" />
                    </div>
                    <div class="col"></div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="text-h6" style="text-align: center;">
                            Somos el punto de conexión entre ustedes y las buenas
                            cervezas artesanales panameñas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END TEST -->
        <div class="carousel-container desktop-only">
            <carousel-section />
        </div>
    </div>
</template>

<script>
import CarouselSection from '@/views/landing/CarouselSection'
export default {
    components: {
        'carousel-section': CarouselSection,
    },
}
</script>
