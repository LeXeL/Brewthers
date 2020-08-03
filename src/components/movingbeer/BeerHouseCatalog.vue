<template>
    <q-page class="q-pa-lg">
        <div class="row justify-center q-mb-lg">
            <div class="text-h4">Beer House Name</div>
        </div>
        <div class="row justify-center q-mb-lg">
            <div class="col"></div>
            <div class="col-lg-1 col-sm-3 col-xs-6">
                <q-img
                    class="rounded-borders"
                    :src="require('@/assets/familia-brewthers/2-oceans.png')"
                />
            </div>
            <div class="col"></div>
        </div>
        <div class="row justify-center q-mb-lg">
            <div class="col"></div>
            <div class="col-lg-2 col-sm-8 col-xs-10">
                <q-select
                    v-model="type"
                    filled
                    dark
                    :options="['Keg', 'Caja']"
                    label="Selecione un tipo"
                    class="full-width"
                />
            </div>
            <div class="col"></div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            type: null,
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        }
    },
}
</script>