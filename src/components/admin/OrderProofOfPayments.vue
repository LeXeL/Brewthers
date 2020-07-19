<template>
    <div>
        <q-file filled dark label="Adjuntar comprobante" class="q-mb-md" v-model="pop">
            <template v-slot:append></template>

            <template v-slot:after>
                <q-btn round dense color="secondary">
                    <i class="fas fa-paper-plane"></i>
                </q-btn>
            </template>
        </q-file>
        <q-list bordered separator dark class="rounded-borders">
            <q-item v-for="(pop, i) in 3" :key="i">
                <q-item-section>15-1-2020</q-item-section>
                <q-item-section avatar>
                    <q-btn color="info" label="Ver" size="sm" @click="popDialog = true" />
                </q-item-section>
            </q-item>
        </q-list>
        <q-dialog v-model="popDialog">
            <q-card dark>
                <q-card-section>
                    <q-img
                        src="https://sunnymoney.weebly.com/uploads/1/9/6/4/19645963/veggie-grocery-receipt_orig.jpeg"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Aceptar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pop: '',
            popDialog: false,
        }
    },
}
</script>