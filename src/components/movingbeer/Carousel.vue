<template>
    <q-carousel arrows animated v-model="slide" height="600px">
        <q-carousel-slide
            name="first"
            :img-src="require('@/assets/movingbeer-bg.jpg')"
        >
            <div class="absolute-center full-width custom-caption">
                <div
                    class="text-h2"
                    style="font-family: GilroyExtraBold; text-transform: uppercase"
                >
                    Bienvenido a movingbeer
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
export default {
    data() {
        return {
            slide: 'first',
        }
    },
}
</script>
