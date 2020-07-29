<template>
    <div>
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <q-file filled dark label="Adjuntar comprobante" class="q-mb-md" v-model="pop">
            <template v-slot:append></template>

            <template v-slot:after>
                <q-btn round dense color="secondary" @click="addPaymentProof()">
                    <i class="fas fa-paper-plane"></i>
                </q-btn>
            </template>
        </q-file>
        <q-list bordered separator dark class="rounded-borders">
            <q-item v-for="(pop, i) in data" :key="i">
                <q-item-section>{{i+1}}</q-item-section>
                <q-item-section avatar>
                    <q-btn color="info" label="Ver" size="sm" @click="asignImage(pop)" />
                </q-item-section>
            </q-item>
        </q-list>
        <q-dialog v-model="popDialog">
            <q-card dark>
                <q-card-section>
                    <q-img :src="imageToDisplay" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Aceptar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return {}
            },
        },
        orderId: {
            type: String,
            default: '',
        },
        restaurantId: {
            type: String,
            default: '',
        },
        fullOrder: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            pop: null,
            popDialog: false,
            imageToDisplay: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        asignImage(pop) {
            this.imageToDisplay = pop
            this.popDialog = true
        },
        clear() {
            this.pop = null
        },
        async addPaymentProof() {
            if (this.pop) {
                this.displayLoading = true
                let files = this.data
                let file = await this.uploadToFirebase(
                    this.pop,
                    `users/proofOfPayment/${this.restaurantId}`,
                    this.pop.name + 'T' + new Date()
                )
                files.push(file)
                let logs = this.fullOrder.logs
                logs.push({
                    action: 'Upload Proof',
                    section: '',
                    who: this.user.email,
                    time: Date.now(),
                })
                api.updateOrdersInformation({
                    id: this.orderId,
                    Order: {paymentProof: files, logs: logs},
                })
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha creado la casa cerveceras con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.clear()
                    })
                    .catch(error => {
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                        this.displayAlert = true
                        this.clear()
                    })
            }
        },
        uploadToFirebase(imageFile, fullDirectory, filename) {
            return new Promise(function (resolve, reject) {
                var storageRef = firebase
                    .storage()
                    .ref(fullDirectory + '/' + filename)
                //Upload file
                var task = storageRef.put(imageFile)
                //Update progress bar
                task.on(
                    'state_changed',
                    function (snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        console.log('Upload is ' + progress + '% done')
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused')
                                break
                        }
                    },
                    function (error) {
                        // Handle unsuccessful uploads
                        console.log(`Error in uploadToFirebase: ${error}`)
                        reject(error)
                    },
                    function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        task.snapshot.ref
                            .getDownloadURL()
                            .then(function (downloadURL) {
                                console.log('File available at', downloadURL)
                                resolve(downloadURL)
                            })
                    }
                )
            })
        },
    },
}
</script>