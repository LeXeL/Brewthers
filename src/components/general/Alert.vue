<template>
    <q-dialog v-model="alert" persistent>
        <q-card dark>
            <q-card-section>
                <div class="text-h6">{{ title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">{{ message }}</q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="ACEPTAR" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
export default {
    props: ['title', 'message', 'display'],
    data() {
        return {
            alert: false,
        }
    },
    methods: {
        displayAlert() {
            this.alert = true
        },
    },
    watch: {
        display: function() {
            this.displayAlert()
        },
    },
}
</script>