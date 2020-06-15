<template>
    <q-page class="q-pa-xl">
        <div class="row">
            <div class="col"></div>
            <div class="col-lg-5">
                <div class="text-h5 q-mb-lg">Detalle de articulos:</div>
                <div class="row q-mb-lg" v-for="(item, i) in 3" :key="i">
                    <div class="col-lg-2">
                        <q-img :src="require('@/assets/beer.jpg')" class="rounded-borders" />
                    </div>
                    <div class="col-lg-10 q-pl-md">
                        <div class="text-h6" style="color: #27a3c3">Nombre de lo que estan comprando</div>
                        <div class="text-subtitle-2">Estilo: Something</div>
                        <div class="text-subtitle-2">Alcohol: 5%</div>
                        <div class="text-subtitle-2">IBU: 150</div>
                        <div class="text-subtitle-2">Precio unitario: $ 5.50</div>
                        <div class="text-subtitle-2">Cantidad: 10</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="q-mb-xl">
                    <div class="text-h5 q-mb-md">Detalle de orden:</div>
                    <div class="text-subitle-2">Articulos (10): $ 150.00</div>
                    <div class="text-subitle-2">ITBMS: $ 10.50</div>
                    <div class="text-h6">Total: $ 160.50</div>
                </div>

                <div class="row">
                    <div class="text-h5 q-mb-md">Metodo de pago:</div>
                </div>
                <div class="row q-mb-lg">
                    <q-option-group
                        :options="paymentOptions"
                        label="Notifications"
                        type="radio"
                        v-model="paymentMethod"
                    />
                </div>
                <q-btn class="full-width" color="primary" label="Enviar orden" />
            </div>
            <div class="col"></div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            paymentMethod: '',
            paymentOptions: [
                {
                    label: 'ACH',
                    value: 'ach',
                },
                {
                    label: 'Yappy',
                    value: 'yappy',
                },
                {
                    label: 'Nequi',
                    value: 'nequi',
                },
                {
                    label: 'Credito',
                    value: 'credit',
                },
            ],
        }
    },
}
</script>
