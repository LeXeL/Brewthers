<template>
    <q-dialog v-model="display" persistent>
        <q-card dark style="width: auto; background-color: #1b1b1b;">
            <q-card-section class="q-pb-none">
                <div
                    class="text-h6 text-center"
                >{{ loading[Math.floor(Math.random() * loading.length)] }}...</div>
            </q-card-section>
            <div class="row justify-center">
                <q-card-section class="q-pt-none">
                    <q-img
                        :src="require('@/assets/beer-animation.gif')"
                        width="150px"
                        class="justify-center"
                    />
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: ['display'],
    data() {
        return {
            loading: [
                'Malteando granos de cereal',
                'Macerando la malta',
                'Fermentando la cerveza',
                'Envasando la pinta',
                'Cargando nueva ronda',
            ],
        }
    },
}
</script>