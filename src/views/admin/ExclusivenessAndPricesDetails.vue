<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md text-white">
            Exclusividad y precios - Restaurant Name
        </div>
        <div class="row q-px-md">
            <div class="col-lg-6 q-pa-md">
                <q-table
                    title="Casas cerveceras"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    dark
                    binary-state-sort
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">
                                {{ props.row.name }}
                            </q-td>
                            <q-td key="canBuy" :props="props">
                                <q-toggle
                                    v-model="props.row.canBuy"
                                    color="primary"
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Administrar"
                                    size="xs"
                                    to="/exclusiveness-and-prices/1234"
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
            <div class="col-lg-6 q-pa-md">
                <q-card class="full-width" dark>
                    <q-card-section>
                        <div class="text-h6">Cervezas - Beer House Name</div>
                    </q-card-section>
                    <q-card-section>
                        <div
                            class="row q-mb-lg"
                            v-for="(beer, i) in beers"
                            :key="i"
                        >
                            <div class="col">
                                <div class="text-subtitle1">
                                    {{ beer.name }}
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-subtitle1 text-center">
                                    $ {{ beer.basePrice.toFixed(2) }}
                                </div>
                            </div>
                            <div class="col">
                                <q-input
                                    filled
                                    dark
                                    dense
                                    type="number"
                                    color="primary"
                                    label="Precio especial"
                                    :value="beer.basePrice.toFixed(2)"
                                />
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-section>
                        <div class="text-h6 q-mb-md">Notas de cliente</div>
                        <q-input type="textarea" filled label="Notas" dark />
                    </q-card-section>
                    <q-card-actions>
                        <q-space />
                        <q-btn flat color="primary" label="Guardar" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    name: 'name',
                    label: 'Nombre',
                    field: 'name',
                    align: 'left',
                    sortable: true,
                },
                {
                    name: 'canBuy',
                    label: 'Puede vender',
                    field: 'canBy',
                    align: 'left',
                },
                {
                    label: 'Precios',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Casa Bruja',
                    canBuy: true,
                },
                {
                    name: 'Boquete Brewing Co.',
                    canBuy: true,
                },
                {
                    name: 'Cerveceria Central',
                    canBuy: true,
                },
                {
                    name: 'La Murga',
                    canBuy: true,
                },
            ],
            beers: [
                {
                    name: 'Nombre de la cerveza',
                    basePrice: 15.5,
                },
                {
                    name: 'Nombre de la cerveza',
                    basePrice: 15.5,
                },
                {
                    name: 'Nombre de la cerveza',
                    basePrice: 15.5,
                },
                {
                    name: 'Nombre de la cerveza',
                    basePrice: 15.5,
                },
            ],
        }
    },
}
</script>
