<template>
    <q-card
        class="movingbeer-tile full-width q-pa-xl"
        @click="$emit('openBeerHouse', brew.name)"
    >
        <q-img :src="require(`@/assets/familia-brewthers/${brew.logo}`)">
            <div
                class="absolute-bottom text-h6 text-center movingbeer-tile-overlay"
            >
                {{ brew.name }}
            </div>
        </q-img>
    </q-card>
</template>

<script>
export default {
    props: ['brew'],
}
</script>
