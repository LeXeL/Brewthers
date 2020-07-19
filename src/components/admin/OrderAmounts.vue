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
            label="Metodo de pago"
            value="ACH"
            readonly
            type="text"
            class="q-mb-md"
        />
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