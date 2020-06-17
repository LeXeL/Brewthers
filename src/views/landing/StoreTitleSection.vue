<template>
    <div class="tiendita-bg flex" style="position: relative">
        <div class="absolute-center">
            <div class="text-h2 title-section desktop-only q-mb-md">tiendita</div>
            <div class="text-h3 title-section mobile-only q-mb-md">tiendita</div>
            <div
                class="text-h4 q-mb-lg"
                style="font-family: GilroyExtraBold; text-align: center;"
            >¡Llegaste donde tenemos pa’ ti y pa’ regala’!</div>
        </div>

        <p class="title-section-link absolute-bottom q-pb-xl" @click="$emit('toggleSection')">
            <span style="font-family: GilroyExtraBold; text-transform: uppercase;">Explora más</span>
            <br />
            <i class="fas fa-chevron-down" style="font-size: 40px;"></i>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style></style>
