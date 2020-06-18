<template>
    <q-page>
        <div class="row q-pa-lg">
            <div class="col">
                <div class="text-h4">Historial de pedidos</div>
            </div>
        </div>
        <div class="row q-pa-lg">
            <div class="col"></div>
            <div class="col on-left">
                <q-input outlined label="No. de orden" dark />
            </div>
            <div class="col on-left">
                <q-select outlined v-model="month" :options="months" label="Mes" dark />
            </div>
            <div class="col">
                <q-select outlined v-model="year" :options="years" label="Mes" dark />
            </div>
        </div>
        <div class="row q-pa-lg">
            <div class="col">
                <q-card dark class="full-width q-mb-lg" v-for="(order, i) in 3" :key="i">
                    <q-card-section>
                        <div class="text-h5">
                            <span style="color: #27a3c3">No. de pedido:</span>
                            154623 -
                            <span style="color: #27a3c3">Estado:</span>
                            Por confirmar
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-section>
                        <div class="row q-mb-md" v-for="(item, i) in 3" :key="i">
                            <div class="col-lg-1">
                                <q-img :src="require('@/assets/beer.jpg')" class="rounded-borders" />
                            </div>
                            <div class="col-lg-9 q-pl-md">
                                <div
                                    class="text-h6"
                                    style="color: #27a3c3"
                                >Nombre de lo que estan comprando</div>
                                <div class="text-subtitle-2">Estilo: Something</div>
                                <div class="text-subtitle-2">Alcohol: 5%</div>
                                <div class="text-subtitle-2">IBU: 150</div>
                            </div>
                            <div class="col-lg-1">
                                <div class="text-h6" style="color: #27a3c3">Cantidad</div>
                                <div class="text-subtitle-2">5</div>
                            </div>
                            <div class="col-lg-1">
                                <div class="text-h6" style="color: #27a3c3">Precio unitario</div>
                                <div class="text-subtitle-2">$ 5.50</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions class="q-pa-md">
                        <q-space />
                        <div class="text-h6 on-left">
                            <span style="color: #27a3c3">Total:</span>
                            $ 150.00
                        </div>
                        <q-btn class="on-right" color="primary">Cancelar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="row q-mb-lg">
            <div class="col flex flex-center">
                <q-pagination v-model="current" :max="5" :direction-links="true"></q-pagination>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            month: '',
            year: '',
            current: 1,
            months: [
                {
                    label: '--',
                    value: '--',
                },
                {
                    label: 'Enero',
                    value: 'jan',
                },
                {
                    label: 'Febrero',
                    value: 'feb',
                },
                {
                    label: 'Marzo',
                    value: 'mar',
                },
                {
                    label: 'Abril',
                    value: 'abr',
                },
                {
                    label: 'Mayo',
                    value: 'may',
                },
                {
                    label: 'Junio',
                    value: 'jun',
                },
                {
                    label: 'Julio',
                    value: 'jul',
                },
                {
                    label: 'Agosto',
                    value: 'aug',
                },
                {
                    label: 'Septiembre',
                    value: 'sep',
                },
                {
                    label: 'Octubre',
                    value: 'oct',
                },
                {
                    label: 'Noviembre',
                    value: 'nov',
                },
                {
                    label: 'Diciembre',
                    value: 'dec',
                },
            ],
            years: [
                {
                    label: '2020',
                    value: '2020',
                },
                {
                    label: '2021',
                    value: '2021',
                },
                {
                    label: '2022',
                    value: '2022',
                },
                {
                    label: '2023',
                    value: '2023',
                },
                {
                    label: '2024',
                    value: '2024',
                },
            ],
        }
    },
}
</script>