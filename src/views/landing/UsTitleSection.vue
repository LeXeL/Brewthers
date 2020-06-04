<template>
    <div class="us-bg" style="position: relative">
        <h2 class="title-section absolute-center">nosotros</h2>
        <p class="title-section-link absolute-bottom q-pb-xl" @click="prueba">Explorar mas</p>
    </div>
</template>

<script>
export default {
    methods: {
        prueba() {
            this.$emit('openSection')
        },
    },
}
</script>

<style lang="scss" scoped></style>
