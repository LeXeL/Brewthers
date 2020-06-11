<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
}
</script>