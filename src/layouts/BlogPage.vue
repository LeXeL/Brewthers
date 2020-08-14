<template>
    <q-layout view="lHh Lpr lFf" class="brewthers-dark-bg">
        <generic-navbar />
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
        <brewthers-footer />
    </q-layout>
</template>

<script>
import GenericNavbar from '@/components/general/GenericNavbar'
import Footer from '@/components/general/Footer'

export default {
    components: {
        'generic-navbar': GenericNavbar,
        'brewthers-footer': Footer,
    },
}
</script>