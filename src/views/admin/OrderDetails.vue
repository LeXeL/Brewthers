<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Orden No. 123456</div>
        <div class="row">
            <div class="col-8">
                <div class="row">
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Datos de orden</div>
                        <order-info />
                    </div>
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Detalle de pago</div>
                        <order-amounts />
                    </div>
                </div>
                <div class="row">
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Entrega</div>
                        <order-address />
                    </div>
                    <div class="col q-pa-md">
                        <div class="text-h6 q-mb-sm">Comprobantes de pago</div>
                        <order-proof-of-payments />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 q-pa-md">
                        <div class="text-h6 q-mb-sm">Log de orden</div>
                        <order-log />
                    </div>
                </div>
            </div>
            <div class="col">
                <order-item-details v-for="(item, i) in 5" :key="i" />
            </div>
        </div>
        <div class="row">
            <div class="col q-pa-md"></div>
            <div class="col q-pa-md"></div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
import OrderInfo from '@/components/admin/OrderInfo'
import OrderAmounts from '@/components/admin/OrderAmounts'
import OrderItemDetails from '@/components/general/OrderItemDetails'
import OrderAddress from '@/components/admin/OrderAddress'
import OrderProofOfPayments from '@/components/admin/OrderProofOfPayments'
import OrderLog from '@/components/admin/OrderLog'

export default {
    components: {
        'order-info': OrderInfo,
        'order-amounts': OrderAmounts,
        'order-item-details': OrderItemDetails,
        'order-address': OrderAddress,
        'order-proof-of-payments': OrderProofOfPayments,
        'order-log': OrderLog,
    },
}
</script>