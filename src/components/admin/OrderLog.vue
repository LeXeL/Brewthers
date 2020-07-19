<template>
    <q-list dark class="rounded-borders">
        <q-item clickable v-for="(el, i) in 3" :key="i">
            <q-item-section>Log entry here</q-item-section>
        </q-item>
    </q-list>
</template>