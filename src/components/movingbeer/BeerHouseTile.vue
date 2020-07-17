<template>
    <q-card class="movingbeer-tile full-width q-pa-xl" @click="$emit('openBeerHouse', brew.id)">
        <q-img :src="brew.photoLocation">
            <div class="absolute-bottom text-h6 text-center movingbeer-tile-overlay">{{ brew.name }}</div>
        </q-img>
    </q-card>
</template>

<script>
export default {
    props: {
        brew: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    // props: ['brew'],
}
</script>
