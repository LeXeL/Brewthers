<template>
    <q-list dark class="rounded-borders">
        <q-item clickable v-for="(el, i) in data" :key="i">
            <q-item-section>{{el}}</q-item-section>
        </q-item>
    </q-list>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>