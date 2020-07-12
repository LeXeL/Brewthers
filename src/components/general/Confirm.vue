<template>
    <q-dialog v-model="confirm">
        <q-card dark>
            <q-card-section>
                <div class="text-h6 text-center">{{ title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">{{ message }}</q-card-section>

            <q-card-actions align="right">
                <q-btn label="Aceptar" color="secondary" @click="sendAccept()" v-close-popup />
                <q-btn label="Cancelar" color="red-7" @click="sendCancel()" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: {
        display: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    data() {
        return {
            confirm: false,
        }
    },
    watch: {
        display: function() {
            this.confirm = !this.confirm
        },
    },
    methods: {
        sendAccept() {
            this.$emit('accept')
        },
        sendCancel() {
            this.$emit('cancel')
        },
    },
}
</script>