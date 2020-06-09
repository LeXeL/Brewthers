<template>
    <q-layout>
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