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
        <div v-if="Object.keys(data).length !== 0">
            <div class="text-h5 q-mb-md">Detalles de articulo</div>
            <div class="row">
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <div class="row q-mb-md">
                        <q-form @submit="handleData" class="full-width">
                            <q-input
                                filled
                                dark
                                label="Nombre"
                                type="text"
                                class="q-mb-md full-width"
                                v-model="data.name"
                                :disable="!editInformation"
                                :rules="[val => !!val || 'El campo es obligatorio']"
                            />
                            <q-input
                                filled
                                class="q-mb-md full-width"
                                dark
                                label="Estilo"
                                v-model="data.style"
                                readonly
                            />
                            <q-input
                                filled
                                class="q-mb-md full-width"
                                dark
                                label="Presentacion"
                                :value="data.type"
                                readonly
                            />
                            <q-input
                                filled
                                class="q-mb-md full-width"
                                dark
                                label="Casa"
                                :value="
                            brewerys.filter(brewery => {
                                if (brewery.id === data.brewery) return brewery
                            })[0].name
                        "
                                readonly
                            />
                            <q-input
                                filled
                                dark
                                label="ABV"
                                type="number"
                                class="q-mb-md full-width"
                                v-model="data.abv"
                                :disable="!editInformation"
                                :rules="[val => !!val || 'El campo es obligatorio']"
                            />
                            <q-input
                                filled
                                dark
                                label="IBU"
                                type="number"
                                class="q-mb-md full-width"
                                v-model="data.ibu"
                                :disable="!editInformation"
                                :rules="[val => !!val || 'El campo es obligatorio']"
                            />
                            <q-input
                                filled
                                dark
                                label="Descripcion"
                                type="textarea"
                                class="q-mb-md full-width"
                                v-model="data.description"
                                :disable="!editInformation"
                                :rules="[val => !!val || 'El campo es obligatorio']"
                            />
                            <q-file
                                filled
                                dark
                                label="Foto"
                                class="q-mb-md"
                                v-model="file"
                                :disable="!editInformation"
                            >
                                <template v-slot:prepend>
                                    <i class="fas fa-paperclip"></i>
                                </template>
                            </q-file>
                            <q-input
                                filled
                                dark
                                label="Precio"
                                type="number"
                                class="q-mb-md full-width"
                                v-model="data.price"
                                :disable="!editInformation"
                                :rules="[val => !!val || 'El campo es obligatorio']"
                            />
                            <q-btn
                                type="submit"
                                color="info"
                                :label="editInformation ? 'Guardar' : 'Editar'"
                            />
                        </q-form>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <q-img :src="data.photoLocation" />
                </div>
                <div class="col-lg-4 col-sm-6 col-xs-12 q-pa-md">
                    <div class="text-h6 q-mb-md">Cantidad en inventario: {{ data.inventory }}</div>
                    <q-input
                        dark
                        filled
                        v-model="addInventory"
                        class="q-mb-md"
                        label="Agregar a inventario"
                        type="number"
                        :rules="[val => !!val || 'El campo es obligatorio', val => val > 0 || 'El valor debe ser mayor a 0']"
                    >
                        <template v-slot:after>
                            <q-btn
                                round
                                color="secondary"
                                @click="addToInventory(parseInt(addInventory))"
                            >
                                <i class="fas fa-plus"></i>
                            </q-btn>
                        </template>
                    </q-input>
                    <q-input
                        dark
                        filled
                        v-model="substractInventory"
                        class="q-mb-md"
                        label="Disminuir de inventario"
                        type="number"
                        :rules="[val => !!val || 'El campo es obligatorio', val => val > 0 || 'El valor debe ser mayor a 0']"
                    >
                        <template v-slot:after>
                            <q-btn
                                round
                                color="red-7"
                                @click="
                                subtractToInventory(
                                    parseInt(substractInventory)
                                )
                            "
                            >
                                <i class="fas fa-minus"></i>
                            </q-btn>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'
export default {
    computed: {
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    data() {
        return {
            file: null,
            data: '',
            addInventory: '',
            substractInventory: '',
            editInformation: false,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        handleData() {
            //Si editGeneralInfo es falso ponlo true y ya.
            if (!this.editInformation) {
                this.editInformation = true
                return
            }
            this.editInformation = false
            this.update()
        },
        async update() {
            this.displayLoading = true
            this.displayAlert = false
            let db = firebase.firestore()
            let brewery = this.brewerys.filter(brewery => {
                if (brewery.id === this.data.brewery) return brewery
            })[0].name
            if (this.file != null) {
                await this.uploadToFirebase(
                    this.file,
                    `products/${brewery}/${this.data.name}`,
                    this.data.name
                ).then(async filename => {
                    this.data.photoLocation = filename
                    api.updateProductInformation({
                        id: this.$route.params.id,
                        product: this.data,
                    })
                        .then(response => {
                            this.displayLoading = false
                            this.alertTitle = 'Exito!'
                            this.alertMessage =
                                'Se ha actualizado con exito la informacion'
                            this.alertType = 'success'
                            this.displayAlert = true
                            this.getProductInformation()
                        })
                        .catch(error => {
                            console.log(error)
                            this.displayLoading = false
                            this.alertTitle = 'Error'
                            this.alertMessage =
                                'Hubo un error con la solicitud por favor inténtelo más tarde'
                            this.alertType = 'error'
                            this.displayAlert = true
                        })
                })
                return
            }
            api.updateProductInformation({
                id: this.$route.params.id,
                product: this.data,
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.getProductInformation()
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        addToInventory(inventory) {
            if (inventory < 0) return
            this.displayLoading = true
            this.displayAlert = false
            this.data.inventory += inventory
            api.updateProductInformation({
                id: this.$route.params.id,
                product: this.data,
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha aumentado con exito el inventario'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.addInventory = ''
                    this.getProductInformation()
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        subtractToInventory(inventory) {
            if (inventory < 0) return
            this.displayLoading = true
            this.displayAlert = false
            let count = this.data.inventory - inventory
            if (count < 0) {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'No se puede restar esta cantidad ya que da un valor menor a 0'
                this.alertType = 'error'
                this.displayAlert = true
                this.substractInventory = ''
            } else {
                this.data.inventory -= inventory
                api.updateProductInformation({
                    id: this.$route.params.id,
                    product: this.data,
                })
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha aumentado con exito el inventario'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.substractInventory = 0
                        this.getProductInformation()
                    })
                    .catch(error => {
                        console.log(error)
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage =
                            'Hubo un error con la solicitud por favor inténtelo más tarde'
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            }
        },
        getProductInformation() {
            api.getProductInformationById({id: this.$route.params.id})
                .then(product => {
                    this.data = product.data.data
                })
                .catch(error => {
                    console.log(error)
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
        api.getProductInformationById({id: this.$route.params.id})
            .then(product => {
                this.data = product.data.data
            })
            .then(() => {
                this.displayLoading = false
            })
            .catch(error => {
                console.log(error)
            })
    },
}
</script>
