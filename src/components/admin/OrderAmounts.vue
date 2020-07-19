<template>
    <div>
        <q-input
            filled
            dark
            label="Total de articulos"
            value="30"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Monto de venta"
            value="150.50"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input filled dark label="ITBMS" value="15.50" readonly type="number" class="q-mb-md" />
        <q-input
            filled
            dark
            label="Total a cobrar"
            value="130.60"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Estado actual"
            value="En revision"
            readonly
            type="text"
            class="q-mb-md"
        />
        <div class="row">
            <q-space />
            <q-btn color="red-7" class="on-left" @click="cancelationModal = true">
                <i class="fas fa-times"></i>
            </q-btn>
            <q-btn color="warning" class="on-left">
                <i class="fas fa-long-arrow-alt-left"></i>
            </q-btn>
            <q-btn color="secondary">
                <i class="fas fa-long-arrow-alt-right"></i>
            </q-btn>
        </div>
        <q-dialog v-model="cancelationModal">
            <q-card style="width: 700px; max-width: 80vw;" dark>
                <q-card-section>
                    <div class="text-h6">Seleccione los motivos de cancelacion de orden</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-option-group
                        :options="cancelationReasons"
                        label="Notifications"
                        type="checkbox"
                        v-model="group"
                        dark
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn label="Confirmar" color="secondary" v-close-popup />
                    <q-btn label="Cancelar" color="red-7" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cancelationModal: false,
            group: [],
            cancelationReasons: [
                {label: 'This is cancelation reason 1', value: 'bat'},
                {label: 'This is cancelation reason 2', value: 'friend'},
                {label: 'This is cancelation reason 3', value: 'upload'},
            ],
        }
    },
}
</script>