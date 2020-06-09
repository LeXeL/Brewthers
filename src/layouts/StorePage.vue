<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar
                class="text-white shadow-2 desktop-only"
                style="background-color: #111"
            >
                <q-avatar>
                    <img src="../assets/brewthers-logo.png" />
                </q-avatar>
                <q-space />
                <q-btn flat round dense>
                    <i class="fas fa-shopping-cart"></i>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<style>
@font-face {
    font-family: GilroyExtraBold;
    src: url('../assets/Gilroy-ExtraBold.otf');
}
@font-face {
    font-family: GilroyLight;
    src: url('../assets/Gilroy-Light.otf');
}

.movingbeer-hero {
    background-image: url('../assets/movingbeer-bg.png');
    background-position: center;
    height: 600px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
</style>
