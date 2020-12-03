<template>
    <div class="us-bg" style="position: relative">
        <h2 class="title-section absolute-center text-white">nosotros</h2>
        <p
            class="title-section-link absolute-bottom q-pb-xl bounce-content bounce"
            @click="$emit('toggleSection')"
        >
            <span
                style="font-family: GilroyExtraBold; text-transform: uppercase;"
                class="text-white"
                >Conócenos</span
            >
            <br />
            <i
                class="fas fa-chevron-down text-white"
                style="font-size: 40px;"
            ></i>
        </p>
    </div>
</template>
