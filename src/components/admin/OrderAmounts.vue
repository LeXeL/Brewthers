<template>
    <div>
        <q-input
            filled
            dark
            label="Total de articulos"
            :value="data.amount"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Monto de venta"
            :value="parseInt(data.total).toFixed(2)"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="ITBMS"
            :value="data.itbms"
            readonly
            type="number"
            class="q-mb-md"
        />
        <!-- <q-input
            filled
            dark
            label="Total a cobrar"
            value="130.60"
            readonly
            type="number"
            class="q-mb-md"
        />-->
        <q-input
            filled
            dark
            label="Metodo de pago"
            :value="data.paymentMethod.toUpperCase()"
            readonly
            type="text"
            class="q-mb-md"
        />
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
}
</script>