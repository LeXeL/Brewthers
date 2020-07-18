<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Orden No. 123456</div>
        <div class="row">
            <div class="col q-pa-md">
                <order-info />
            </div>
            <div class="col q-pa-md">
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
                <q-input
                    filled
                    dark
                    label="ITBMS"
                    value="15.50"
                    readonly
                    type="number"
                    class="q-mb-md"
                />
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
                    <q-btn color="red-7" class="on-left" label="cancelar" />
                    <q-btn color="secondary" label="continuar" />
                </div>
            </div>
            <div class="col">
                <order-item-details class="q-pa-md" v-for="(item, i) in 7" :key="i" />
            </div>
        </div>
    </div>
</template>

<script>
import OrderInfo from '@/components/admin/OrderInfo'
import OrderItemDetails from '@/components/general/OrderItemDetails'

export default {
    components: {
        'order-info': OrderInfo,
        'order-item-details': OrderItemDetails,
    },
}
</script>