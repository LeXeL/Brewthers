<template>
    <q-card class="my-card text-white full-width" dark>
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <q-card-section>
            <div class="text-h6">Nuevo articulo</div>
        </q-card-section>

        <q-card-section>
            <q-input filled dark label="Nombre" type="text" class="q-mb-md" v-model="form.name" />
            <q-select
                filled
                class="q-mb-md"
                dark
                :options="styles"
                label="Estilo"
                v-model="form.style"
            />
            <q-select
                filled
                class="q-mb-md"
                dark
                :options="presentations"
                label="Presentacion"
                v-model="form.type"
            />
            <q-select
                filled
                class="q-mb-md"
                dark
                :options="brewerys.map(brewery=>{
                    return brewery.name
                })"
                label="Casa"
                v-model="form.brewery"
            />
            <q-input filled dark label="ABV" type="number" class="q-mb-md" v-model="form.abv" />
            <q-input filled dark label="IBU" type="number" class="q-mb-md" v-model="form.ibu" />
            <q-input
                filled
                dark
                label="Descripcion"
                type="textarea"
                class="q-mb-md"
                v-model="form.description"
            />
            <q-file filled dark label="Foto" class="q-mb-md" v-model="file">
                <template v-slot:prepend>
                    <i class="fas fa-paperclip"></i>
                </template>
            </q-file>
            <q-input filled dark label="Precio" type="number" class="q-mb-md" v-model="form.price" />
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
            <q-space />
            <q-btn color="secondary" @click="create()">Guardar</q-btn>
            <q-btn color="red-7" @click="clear()">Cancelar</q-btn>
        </q-card-actions>
    </q-card>
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
            styles: ['style 1', 'style 2', 'style 3', 'style 4', 'style 5'],
            presentations: ['KEG', 'Caja'],
            form: {
                name: '',
                style: '',
                type: '',
                brewery: '',
                abv: '',
                ibu: '',
                description: '',
                photoLocation: '',
                price: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        clear() {
            this.form = {
                name: '',
                style: '',
                type: '',
                brewery: '',
                abv: '',
                ibu: '',
                description: '',
                photoLocation: '',
                price: '',
            }
            this.file = null
        },
        async create() {
            this.displayLoading = true
            let db = firebase.firestore()
            await this.uploadToFirebase(
                this.file,
                `products/${this.form.brewery}/${this.form.name}`,
                this.form.name
            ).then(async filename => {
                this.form.photoLocation = filename
                this.brewerys.forEach(brewery => {
                    if (this.form.brewery === brewery.name)
                        this.form.brewery = brewery.id
                })
                api.createProductOnDatabase({product: this.form})
                    .then(response => {
                        this.displayLoading = false
                        this.displayAlert = true
                        this.alertTitle = 'Exito!'
                        this.alertMessage = 'Se ha creado el producto con exito'
                        this.alertType = 'success'
                        this.clear()
                    })
                    .catch(error => {
                        this.displayLoading = false
                        this.displayAlert = true
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                    })
            })
        },
        uploadToFirebase(imageFile, fullDirectory, filename) {
            return new Promise(function(resolve, reject) {
                var storageRef = firebase
                    .storage()
                    .ref(fullDirectory + '/' + filename)
                //Upload file
                var task = storageRef.put(imageFile)
                //Update progress bar
                task.on(
                    'state_changed',
                    function(snapshot) {
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
                    function(error) {
                        // Handle unsuccessful uploads
                        console.log(`Error in uploadToFirebase: ${error}`)
                        reject(error)
                    },
                    function() {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        task.snapshot.ref
                            .getDownloadURL()
                            .then(function(downloadURL) {
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