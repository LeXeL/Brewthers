<template>
    <q-page class="q-pa-md pattern-bg" style="height: auto; background-repeat: repeat-y">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert=false"
        ></brewthers-alert>
        <div class="row q-pt-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-8 col-xs-12">
                <div class="text-h4 q-mb-xl">{{ title }}</div>
            </div>
            <div class="col desktop-only"></div>
        </div>

        <div class="row">
            <div class="col desktop-only"></div>

            <div class="col-lg-8 col-sm-12 col-xs-12" v-if="data.length > 0">
                <div class="row">
                    <div class="col-lg-8 col-sm-8 col-xs-12 q-mb-md">
                        <div class="text-h5 q-pl-md">Detalle de articulos:</div>
                        <order-item-details
                            :data="item"
                            v-for="(item, i) in data[0].cart"
                            :key="i"
                        />
                    </div>
                    <div class="col-lg-4 col-sm-4 col-xs-12">
                        <div class="q-mb-xl">
                            <div class="text-h5 q-mb-md">Detalle de orden:</div>
                            <div
                                class="text-subitle-2"
                            >Articulos ({{calculateTotalAmount()}}): $ {{calculatePrice()}}</div>
                            <div class="text-subitle-2">ITBMS: $ {{ITBM}}</div>
                            <div class="text-h6">Total: $ {{calculateTotal()}}</div>
                        </div>
                        <div class="row" v-if="orderStatus === 'open'">
                            <div class="text-h5 q-mb-md">Metodo de pago:</div>
                        </div>
                        <div class="row q-mb-lg" v-if="orderStatus === 'open'">
                            <q-option-group
                                :options="paymentOptions"
                                label="Notifications"
                                type="radio"
                                v-model="paymentMethod"
                            />
                        </div>
                        <div
                            class="row"
                            v-if="proofRequired.includes(paymentMethod) && orderStatus === 'open'"
                        >
                            <div class="text-h5 q-mb-md">Comprobante de pago:</div>
                        </div>
                        <div
                            class="row q-mb-lg"
                            v-if="proofRequired.includes(paymentMethod) && orderStatus === 'open'"
                        >
                            <q-file
                                outlined
                                color="white"
                                dark
                                label="Adjuntar comprobante"
                                v-model="file"
                            >
                                <template v-slot:prepend>
                                    <i class="fas fa-paperclip"></i>
                                </template>
                            </q-file>
                        </div>
                        <q-btn
                            class="full-width q-mb-lg"
                            color="primary"
                            label="Enviar orden"
                            @click="sendOrder"
                            v-if="orderStatus == 'open'"
                        />
                        <q-btn
                            class="full-width q-mb-lg"
                            color="primary"
                            label="Volver a Movingbeer"
                            v-else
                            to="/movingbeer"
                        />
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>

        <q-dialog v-model="orderConfirmationDialog">
            <q-card dark class="text-white">
                <q-card-section>
                    <div class="text-h6">Enviado con exito</div>
                </q-card-section>

                <q-card-section
                    class="q-pt-none"
                >Tu orden ha sido enviada con exito. Pronto nos pondremos en contacto contigo.</q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

import * as api from '@/api/api'

import OrderItemDetails from '@/components/general/OrderItemDetails'
export default {
    data() {
        return {
            file: null,
            orderStatus: 'open',
            title: 'Confirmacion de orden',
            orderConfirmationDialog: false,
            paymentMethod: '',
            proofRequired: ['ach', 'yappy', 'nequi'],
            ITBM: 10.51,
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
                {
                    label: 'POS',
                    value: 'pos',
                },
            ],
            data: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            subTotal: 0,
            total: 0,
            amount: 0,
        }
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        calculateTotal() {
            let total = 0
            if (this.data[0].cart) {
                this.data[0].cart.forEach(product => {
                    total +=
                        parseFloat(product.price) * parseFloat(product.amount)
                })
                this.total =
                    parseFloat(total.toFixed(2)) + parseFloat(this.ITBM)
                return this.total.toFixed(2)
            }
            return '0'
        },
        calculatePrice() {
            let total = 0
            if (this.data[0].cart) {
                this.data[0].cart.forEach(product => {
                    total +=
                        parseFloat(product.price) * parseFloat(product.amount)
                })
                this.subTotal = total.toFixed(2)
                return this.subTotal
            }
            return '0'
        },
        calculateTotalAmount() {
            let amount = 0
            if (this.data[0].cart) {
                this.data[0].cart.forEach(product => {
                    amount += product.amount
                })
                this.amount = amount.toFixed(0)
                return this.amount
            }
            return '0'
        },
        async sendOrder() {
            if (this.user.role === 'admin') {
                this.alertTitle = 'Hey AWANTA'
                this.alertMessage =
                    'Los administradores no pueden hacer ordenes'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.paymentMethod === '') {
                this.alertTitle = 'Hey AWANTA'
                this.alertMessage = 'Tienes que escoger un metodo de pago!'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.displayLoading = true
            let obj = {}
            obj.restaurantId = this.data[0].id
            obj.cart = this.data[0].cart
            obj.total = this.total.toFixed(2)
            obj.itbms = this.ITBM
            obj.amount = this.amount
            obj.paymentMethod = this.paymentMethod
            obj.paymentProof = []
            if (this.file) {
                let file = await this.uploadToFirebase(
                    this.file,
                    `users/proofOfPayment/${this.uid}`,
                    this.file.name + 'T' + new Date()
                )
                obj.paymentProof.push(file)
                obj.logs = {
                    action: 'Upload Proof',
                    section: '',
                    who: 'own User',
                    time: Date.now(),
                }
            } else {
                obj.paymentProof = []
            }

            api.createOrdersOnDatabase({order: obj}).then(response => {
                this.displayLoading = false
                this.orderStatus = 'sent'
                this.title = 'Orden enviada con exito'
                this.orderConfirmationDialog = true
                api.clearShoppingCart({uid: this.uid})
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
    async mounted() {
        this.displayLoading = true
        window.scrollTo(0, 0)
        let db = firebase.firestore()
        await db
            .collection('users')
            .doc(this.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.addToData(doc.id, doc.data())
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!')
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
            })
        this.displayLoading = false
    },
    components: {
        'order-item-details': OrderItemDetails,
    },
}
</script>
