<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="text-h5 q-mb-md text-white">
            Exclusividad y precios - {{ restaurantInformation.restaurantName }}
        </div>
        <div class="row q-px-md">
            <div class="col-lg-6 q-pa-md">
                <q-table
                    title="Casas cerveceras"
                    :data="filteredBrewerys"
                    :columns="columns"
                    row-key="name"
                    dark
                    binary-state-sort
                    :pagination.sync="initialPagination"
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
                                    @input="
                                        addBreweryToExclusiveness(props.row)
                                    "
                                />
                            </q-td>
                            <q-td>
                                <q-btn
                                    color="primary"
                                    label="Administrar"
                                    size="xs"
                                    @click="
                                        selectedBreweryToShowBeers(props.row.id)
                                    "
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
            <div class="col-lg-6 q-pa-md">
                <q-card class="full-width" dark>
                    <q-card-section v-if="beers.length > 0">
                        <div class="text-h6">
                            Cervezas - {{ selectedBrewery.name }}
                        </div>
                    </q-card-section>
                    <q-card-section v-if="beers.length <= 0">
                        <div class="text-h6">No hay Cervezas para Mostrar</div>
                    </q-card-section>
                    <q-card-section v-if="beers.length > 0">
                        <div
                            class="row q-mb-lg"
                            v-for="(beer, i) in beers"
                            :key="i"
                        >
                            <div class="col">
                                <div class="text-subtitle1">
                                    {{ beer.name.substring(0, 14) }}
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-subtitle1">
                                    {{ beer.type }}
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-subtitle1">
                                    $ {{ beer.price.toFixed(2) }}
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
                                    v-model.number="beer.newPrice"
                                    :value="beer.price.toFixed(2)"
                                />
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-section>
                        <div class="text-h6 q-mb-md">Notas de cliente</div>
                        <q-input
                            type="textarea"
                            filled
                            label="Notas"
                            dark
                            v-model="exclusivenessNotes"
                        />
                    </q-card-section>
                    <q-card-actions>
                        <q-space />
                        <q-btn
                            flat
                            color="primary"
                            label="Guardar"
                            @click="generateExclusivenessPrice()"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
export default {
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 0,
                // rowsNumber: xx if getting data from a server
            },
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
                    label: 'Exclusividad',
                    field: 'canBy',
                    align: 'left',
                },
                {
                    label: 'Precios',
                    align: 'left',
                },
            ],
            data: [],
            beers: [],
            restaurantInformation: [],
            filteredBrewerys: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            products: [],
            selectedBrewery: '',
            exclusivenessNotes: '',
        }
    },
    computed: {
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    watch: {
        restaurantInformation(newValue, oldValue) {
            if (newValue.exclusiveness.notes != undefined) {
                this.exclusivenessNotes = newValue.exclusiveness.notes
            }
        },
    },
    methods: {
        addBreweryToExclusiveness(brewery) {
            let currentExclusiveness = {
                ...this.restaurantInformation.exclusiveness,
            }
            //determinar si ya existe dentro del current
            if (Object.keys(currentExclusiveness).includes(brewery.id)) {
                //Si existe y brewery.canBuy es falso quiero quitarla
                if (!brewery.canBuy) {
                    delete currentExclusiveness[brewery.id]
                }
            } else {
                if (brewery.canBuy) {
                    currentExclusiveness[brewery.id] = {
                        name: brewery.name,
                        products: [],
                    }
                }
            }
            this.displayLoading = true
            api.updateuserinformation({
                uid: this.$route.params.id,
                user: {exclusiveness: currentExclusiveness},
            })
                .then(response => {
                    if (response.status === 200) {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Actualización realizada correctamente.'
                        this.alertType = 'success'
                        this.displayAlert = true
                    }
                })
                .then(() => {
                    api.getuserinformationbyid({
                        uid: this.$route.params.id,
                    }).then(
                        response =>
                            (this.restaurantInformation = response.data.data)
                    )
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error en la petición, intentelo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        isProductInExclusivenessDeal(product) {
            let currentExclusiveness = {
                ...this.restaurantInformation.exclusiveness,
            }
            let newPrice = 0
            currentExclusiveness[product.brewery].products.forEach(
                productExclusiveness => {
                    if (productExclusiveness.id === product.id) {
                        newPrice = productExclusiveness.newPrice
                    }
                }
            )
            return parseFloat(newPrice).toFixed(2)
        },
        selectedBreweryToShowBeers(id) {
            this.selectedBrewery = this.brewerys.find(
                brewery => brewery.id === id
            )
            let currentExclusiveness = {
                ...this.restaurantInformation.exclusiveness,
            }
            let breweryIdOnExclusiveness = Object.keys(
                currentExclusiveness
            ).find(exclusiveness => exclusiveness === this.selectedBrewery.id)
            if (breweryIdOnExclusiveness === undefined) {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Este restaurante no tiene exclusividad con esa casa cervezera por favor revise'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.beers = []
            let data = this.products
                .filter(product => product.brewery === id)
                .map(product => {
                    let el = {...product}
                    let newPrice = this.isProductInExclusivenessDeal(el)
                    el['newPrice'] =
                        newPrice > 0 ? newPrice : el.price.toFixed(2)
                    return el
                })
            if (data.length > 0) this.beers = data
        },
        returnFilteredBreweryData() {
            this.filteredBrewerys = this.brewerys
                .filter(brewery => brewery.status === 'active')
                .map(brewery => {
                    return {
                        id: brewery.id,
                        name: brewery.name,
                        canBuy: Object.keys(
                            this.restaurantInformation.exclusiveness
                        ).includes(brewery.id),
                    }
                })
        },
        async generateExclusivenessPrice() {
            let currentExclusiveness = {
                ...this.restaurantInformation.exclusiveness,
            }
            let breweryIdOnExclusiveness = Object.keys(
                currentExclusiveness
            ).find(exclusiveness => exclusiveness === this.selectedBrewery.id)
            // if (breweryIdOnExclusiveness === undefined) {
            //     this.displayLoading = false
            //     this.alertTitle = 'Error'
            //     this.alertMessage =
            //         'Este restaurante no tiene exclusividad con esa casa cervezera por favor revise'
            //     this.alertType = 'error'
            //     this.displayAlert = true
            //     return
            // }
            for await (const beer of this.beers) {
                if (
                    parseFloat(beer.newPrice).toFixed(2) !=
                    parseFloat(beer.price).toFixed(2)
                ) {
                    currentExclusiveness[
                        breweryIdOnExclusiveness
                    ].products.push(beer)
                }
            }
            this.displayLoading = true
            currentExclusiveness.notes = this.exclusivenessNotes
            api.updateuserinformation({
                uid: this.$route.params.id,
                user: {exclusiveness: currentExclusiveness},
            })
                .then(response => {
                    if (response.status === 200) {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Actualización realizada correctamente.'
                        this.alertType = 'success'
                        this.displayAlert = true
                    }
                })
                .then(() => {
                    api.getuserinformationbyid({
                        uid: this.$route.params.id,
                    }).then(
                        response =>
                            (this.restaurantInformation = response.data.data)
                    )
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error en la petición, intentelo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    async mounted() {
        this.displayLoading = true
        api.returnAllProducts().then(
            response => (this.products = response.data.data)
        )
        api.getuserinformationbyid({
            uid: this.$route.params.id,
        })
            .then(response => (this.restaurantInformation = response.data.data))
            .then(async () => {
                this.displayLoading = false
                if (this.brewerys != undefined) {
                    this.returnFilteredBreweryData()
                    return
                }
                api.returnAllBrewerys().then(response => {
                    this.$store.dispatch('setBrewerys', response.data.data)
                    this.returnFilteredBreweryData()
                })
            })
    },
}
</script>
