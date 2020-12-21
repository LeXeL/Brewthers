<template>
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @accept="deleteBrewery"
            @cancel="displayConfirm = false"
        ></confirm-dialog>
        <div class="text-h5 q-mb-md text-white q-px-md">
            Administrador de inventario
        </div>
        <div class="row">
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-select
                    dark
                    dense
                    filled
                    :options="searchHouseOptions"
                    v-model="searchHouse"
                    label="Casa cervecera"
                    emit-value
                    map-options
                />
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-select
                    dark
                    dense
                    filled
                    v-model="searchType"
                    :options="searchTypeOptions"
                    label="Tipo"
                    emit-value
                    map-options
                />
            </div>
            <div class="col-lg-2 col-md-2 col-xs-12 q-pa-md">
                <q-input
                    dark
                    dense
                    filled
                    v-model="searchName"
                    label="Nombre"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-md-8 col-xs-12 q-pa-md">
                <inventory-manager-table
                    :data="returnFilteredTable"
                    @changestatus="editStatus"
                    @delete="askForDeleteBrewery"
                    @namechange="updateNameChange"
                    @inventorychange="updateInvetoryChange"
                ></inventory-manager-table>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12 q-pa-md">
                <inventory-manager-form />
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import InventoryManagerTable from '@/components/admin/InventoryManagerTable'
import InventoryManagerForm from '@/components/admin/InventoryManagerForm'

export default {
    data() {
        return {
            data: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            workingDeletedId: '',
            searchName: this.$route.query.n ? this.$route.query.n : '',
            searchType: this.$route.query.t ? this.$route.query.t : '',
            searchTypeOptions: [
                {
                    label: 'TODO',
                    value: '',
                },
                {
                    label: 'CAJA',
                    value: 'Caja',
                },
                {
                    label: 'KEG',
                    value: 'KEG',
                },
            ],
            searchHouse: this.$route.query.h ? this.$route.query.h : '',
            searchHouseOptions: [],
        }
    },
    computed: {
        returnFilteredTable() {
            let filteredData = []
            this.data.forEach(item => {
                if (
                    item.name
                        .toLowerCase()
                        .includes(this.searchName.toLowerCase()) &&
                    item.type.includes(this.searchType) &&
                    item.brewery.includes(this.searchHouse)
                )
                    filteredData.push(item)
            })
            return filteredData
        },
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    methods: {
        updateInvetoryChange(event) {
            this.displayLoading = true
            this.displayAlert = false
            api.updateProductInformation({
                id: event.id,
                product: {inventory: event.inventory},
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el inventario con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        updateNameChange(event) {
            this.displayLoading = true
            this.displayAlert = false
            api.updateProductInformation({
                id: event.id,
                product: {name: event.newName},
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el nombre con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        askForDeleteBrewery(event) {
            this.displayConfirm = true
            this.alertTitle = 'Esta seguro?'
            this.alertMessage =
                'Se va a proceder a eliminar esta casa cervecera'
            this.workingDeletedId = event.id
        },
        deleteBrewery() {
            this.displayLoading = true
            this.displayAlert = false
            this.displayConfirm = false
            api.deleteProductInformation({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el estado con exito.'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        editStatus(event) {
            this.displayLoading = true
            this.displayAlert = false
            let newStatus = event.status === 'active' ? 'inactive' : 'active'
            api.updateProductInformation({
                id: event.id,
                product: {status: newStatus},
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el estado con exito.'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        addToData(id, data) {
            data.id = id
            data.inventory = parseInt(data.inventory)
            this.data.push(data)
        },
        editData(id, data) {
            data.id = id
            data.inventory = parseInt(data.inventory)
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1)
                }
            })
        },
        formatBreweriesSelect() {
            this.searchHouseOptions = this.brewerys.map(brewery => {
                return {label: brewery.name, value: brewery.id}
            })
            this.searchHouseOptions.splice(0, 0, {label: 'TODOS', value: ''})
        },
        appendFilterParams() {
            window.history.replaceState(
                null,
                null,
                `?n=${this.searchName}&t=${this.searchType}&h=${this.searchHouse}`
            )
        },
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('product').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeData(change.doc.id)
                    }
                })
            },
            error => {
                console.log(error)
            }
        )
        if (!this.$store.getters.brewerys.length) {
            api.returnAllBrewerys().then(response => {
                this.$store.dispatch('setBrewerys', response.data.data)
            })
        }
        this.formatBreweriesSelect()
    },
    watch: {
        searchName: function () {
            this.appendFilterParams()
        },
        searchType: function () {
            this.appendFilterParams()
        },
        searchHouse: function () {
            this.appendFilterParams()
        },
    },
    components: {
        'inventory-manager-table': InventoryManagerTable,
        'inventory-manager-form': InventoryManagerForm,
    },
}
</script>
