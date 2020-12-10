<template>
    <q-card class="my-card text-white full-width" dark>
        <q-form @submit="handleSubmitedContent()">
            <loading-alert :display="displayLoading"></loading-alert>
            <brewthers-alert
                :display="displayAlert"
                :title="alertTitle"
                :message="alertMessage"
                :type="alertType"
                @accept="displayAlert = false"
            ></brewthers-alert>
            <q-card-section>
                <div class="text-h6">Nueva casa cervecera</div>
            </q-card-section>

            <q-card-section>
                <q-input
                    filled
                    dark
                    label="Nombre"
                    class="q-mb-md"
                    v-model="form.name"
                    :rules="[val => !!val || 'El campo es obligatorio']"
                />
                <q-file append filled dark label="Logo" v-model="breweryImage">
                    <template v-slot:prepend>
                        <i class="fas fa-paperclip"></i>
                    </template>
                    <template v-slot:error>
                        'El campo es obligatorio'
                    </template>
                </q-file>
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
                <q-space />
                <q-btn color="secondary" type="submit">Guardar</q-btn>
                <q-btn color="red-7" @click="Cancel()">Cancelar</q-btn>
            </q-card-actions>
        </q-form>
    </q-card>
</template>
<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'

export default {
    props: ['editBrewingHouse'],
    watch: {
        editBrewingHouse(newValue, oldValue) {
            if (Object.keys(newValue).length > 0) {
                this.isEditingBrewery = true
                this.form.name = newValue.name
            }
        },
    },
    computed: {
        isValid() {
            return !!this.breweryImage
        },
    },
    data() {
        return {
            breweryImage: null,
            form: {
                name: '',
                photoLocation: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            isEditingBrewery: false,
        }
    },
    methods: {
        handleSubmitedContent() {
            if (this.isEditingBrewery) {
                this.EditBrewery()
                return
            }
            this.Generate()
        },
        Cancel() {
            this.breweryImage = null
            this.form.name = ''
            this.form.photoLocation = ''
            this.isEditingBrewery = false
        },
        async EditBrewery() {
            //Si el logo esta vacio no se cambia, si el logo tiene un archivo nuevo se overlapea y se cambia.
            this.displayLoading = true
            let db = firebase.firestore()
            if (this.breweryImage !== null) {
                await this.uploadToFirebase(
                    this.breweryImage,
                    `brewery/${this.form.name}`,
                    this.form.name
                ).then(async filename => {
                    this.form.photoLocation = filename
                    api.updateBreweryInformation({
                        id: this.editBrewingHouse.id,
                        brewery: this.form,
                    })
                        .then(response => {
                            this.displayLoading = false
                            this.alertTitle = 'Exito!'
                            this.alertMessage =
                                'Se ha actualizado la casa cerveceras con exito'
                            this.alertType = 'success'
                            this.displayAlert = true
                            this.Cancel()
                        })
                        .catch(error => {
                            this.displayLoading = false
                            this.alertTitle = 'Error'
                            this.alertMessage = error
                            this.alertType = 'error'
                            this.displayAlert = true
                        })
                })
                return
            }
            let obj = this.form
            delete obj.photoLocation
            api.updateBreweryInformation({
                id: this.editBrewingHouse.id,
                brewery: obj,
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado la casa cerveceras con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.Cancel()
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        async Generate() {
            this.displayLoading = true
            let db = firebase.firestore()
            await this.uploadToFirebase(
                this.breweryImage,
                `brewery/${this.form.name}`,
                this.form.name
            ).then(async filename => {
                this.form.photoLocation = filename
                api.createBreweryOnDatabase({brewery: this.form})
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha creado la casa cerveceras con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.Cancel()
                    })
                    .catch(error => {
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
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
}
</script>