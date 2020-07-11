<template>
    <div class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @accept="deleteBrewery"
        ></confirm-dialog>
        <div class="text-h5 q-mb-md">Administrador de casas cerveceras</div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <brewing-houses-table
                    :data="data"
                    @changeStatus="editStatus"
                    @delete="askForDeleteBrewery"
                    @namechange="logevent"
                ></brewing-houses-table>
            </div>
            <div class="col-lg-4 q-pa-md">
                <brewing-houses-form />
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import * as api from '@/api/api'

import BrewingHousesTable from '@/components/admin/BrewingHousesTable'
import BrewingHousesForm from '@/components/admin/BrewingHousesForm'

export default {
    components: {
        'brewing-houses-table': BrewingHousesTable,
        'brewing-houses-form': BrewingHousesForm,
    },
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
        }
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('brewery').onSnapshot(snapshot => {
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
        })
    },
    methods: {
        logevent(event) {
            console.log(event)
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
            api.deleteBreweryInformation({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el estado con exito'
                    this.alertType = 'success'
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                })
        },
        editStatus(event) {
            this.displayLoading = true
            this.displayAlert = false
            let newStatus = event.status === 'active' ? 'inactive' : 'active'
            api.updateBreweryInformation({
                id: event.id,
                brewery: {status: newStatus},
            })
                .then(() => {
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el estado con exito'
                    this.alertType = 'success'
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.displayAlert = true
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                })
        },
        addToData(id, data) {
            data.id = id
            this.data.push(data)
        },
        editData(id, data) {
            data.id = id
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
    },
}
</script>