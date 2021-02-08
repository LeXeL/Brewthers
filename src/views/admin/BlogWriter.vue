<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
            :redirect="redirect"
        ></brewthers-alert>
        <div>
            <div class="text-h5 q-mb-md text-white">Redactar blog</div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-md">
                    <q-input
                        filled
                        dark
                        type="text"
                        label="Titulo del blog"
                        v-model="title"
                        :rules="[val => !!val || 'El campo es obligatorio']"
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-md">
                    <q-file
                        bottom-slots
                        filled
                        dark
                        label="Blog banner"
                        v-model="bannerImage"
                        :rules="[val => !!val || 'El campo es obligatorio']"
                    >
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                        <template v-slot:hint
                            >Tamaño recomendado: 1920 x 400 (px)</template
                        >
                    </q-file>
                </div>
            </div>
            <div class="row">
                <div class="col q-pa-md">
                    <q-editor
                        dark
                        v-model="body"
                        toolbar-bg="grey-9"
                        :dense="$q.screen.lt.md"
                        :toolbar="[
                            [
                                {
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    list: 'only-icons',
                                    options: [
                                        'left',
                                        'center',
                                        'right',
                                        'justify',
                                    ],
                                },
                            ],
                            ['hr', 'link'],
                            ['fullscreen'],
                            [
                                {
                                    label: $q.lang.editor.formatting,
                                    icon: $q.iconSet.editor.formatting,
                                    list: 'no-icons',
                                    options: [
                                        'p',
                                        'h1',
                                        'h2',
                                        'h3',
                                        'h4',
                                        'h5',
                                        'h6',
                                        'code',
                                    ],
                                },
                                {
                                    label: $q.lang.editor.fontSize,
                                    icon: $q.iconSet.editor.fontSize,
                                    fixedLabel: true,
                                    fixedIcon: true,
                                    list: 'no-icons',
                                    options: [
                                        'size-1',
                                        'size-2',
                                        'size-3',
                                        'size-4',
                                        'size-5',
                                        'size-6',
                                        'size-7',
                                    ],
                                },
                                'removeFormat',
                            ],
                            [
                                'quote',
                                'unordered',
                                'ordered',
                                'outdent',
                                'indent',
                            ],

                            ['undo', 'redo'],
                            ['viewsource'],
                        ]"
                    />
                </div>
            </div>
            <div class="row text-right">
                <q-space />
                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12 q-pa-md">
                    <q-btn
                        color="warning"
                        class="full-width"
                        :label="
                            !isEditing
                                ? 'Guardar borrador'
                                : 'Actualizar borrador'
                        "
                        @click="saveAsDraft()"
                    />
                </div>

                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12 q-pa-md">
                    <q-btn
                        color="secondary"
                        class="full-width"
                        :label="
                            !isEditing ? 'Guardar y Publicar' : 'Actualizar'
                        "
                        @click="saveAsPublic()"
                    />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'

import * as api from '@/api/api'

export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            data: [],
            title: '',
            body: '',
            bannerImage: null,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            isEditing: false,
            redirect: '',
        }
    },
    methods: {
        async saveAsDraft() {
            this.displayLoading = true
            let db = firebase.firestore()
            let blogInfo = {}
            blogInfo.bannerLocation = 'filename'
            blogInfo.title = this.title
            blogInfo.body = this.body

            blogInfo.by = {name: this.user.name, email: this.user.email}
            blogInfo.createdTime = new Date()
            api.createDraftBlogInDataBase({blogInfo: blogInfo})
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha creado el blog en modo draft con exito'
                    this.alertType = 'success'
                    this.redirect = '/blog-manager'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
            // if (this.isEditing) {
            //     blogInfo.title = this.title
            //     blogInfo.body = this.body
            //     if (this.bannerImage != null) {
            //         await this.uploadToFirebase(
            //             this.bannerImage,
            //             `blog/${this.bannerImage.name}`,
            //             this.bannerImage.name + 'T' + new Date()
            //         ).then(
            //             async filename => (blogInfo.bannerLocation = filename)
            //         )
            //     }
            //     api.updateBlog({
            //         type: 'draft',
            //         id: this.$route.params.id,
            //         blogInfo: blogInfo,
            //     })
            //         .then(response => {
            //             this.displayLoading = false
            //             this.alertTitle = 'Exito!'
            //             this.alertMessage =
            //                 'Se ha actualizado el blog en modo draft con exito'
            //             this.alertType = 'success'
            //             this.redirect = '/blog-manager'
            //             this.displayAlert = true
            //         })
            //         .catch(error => {
            //             this.displayLoading = false
            //             this.alertTitle = 'Error'
            //             this.alertMessage = error
            //             this.alertType = 'error'
            //             this.displayAlert = true
            //         })
            //     return
            // }
            // await this.uploadToFirebase(
            //     this.bannerImage,
            //     `blog/${this.bannerImage.name}`,
            //     this.bannerImage.name + 'T' + new Date()
            // ).then(async filename => {
            //     blogInfo.bannerLocation = filename
            //     blogInfo.title = this.title
            //     blogInfo.body = this.body

            //     blogInfo.by = {name: this.user.name, email: this.user.email}
            //     blogInfo.createdTime = new Date()
            //     api.createDraftBlogInDataBase({blogInfo: blogInfo})
            //         .then(response => {
            //             this.displayLoading = false
            //             this.alertTitle = 'Exito!'
            //             this.alertMessage =
            //                 'Se ha creado el blog en modo draft con exito'
            //             this.alertType = 'success'
            //             this.redirect = '/blog-manager'
            //             this.displayAlert = true
            //         })
            //         .catch(error => {
            //             this.displayLoading = false
            //             this.alertTitle = 'Error'
            //             this.alertMessage = error
            //             this.alertType = 'error'
            //             this.displayAlert = true
            //         })
            // })
        },
        async saveAsPublic() {
            this.displayLoading = true
            let db = firebase.firestore()
            let blogInfo = {}
            if (this.isEditing) {
                blogInfo.title = this.title
                blogInfo.body = this.body
                blogInfo.status = 'public'
                if (this.bannerImage != null) {
                    await this.uploadToFirebase(
                        this.bannerImage,
                        `blog/${this.bannerImage.name}`,
                        this.bannerImage.name + 'T' + new Date()
                    ).then(
                        async filename => (blogInfo.bannerLocation = filename)
                    )
                }
                api.updateBlog({
                    type: 'public',
                    id: this.$route.params.id,
                    blogInfo: blogInfo,
                })
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha actualizado el blog en modo publico con exito'
                        this.alertType = 'success'
                        this.redirect = '/blog-manager'
                        this.displayAlert = true
                    })
                    .catch(error => {
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
                return
            }
            await this.uploadToFirebase(
                this.bannerImage,
                `blog/${this.bannerImage.name}`,
                this.bannerImage.name + 'T' + new Date()
            ).then(async filename => {
                blogInfo.bannerLocation = filename
                blogInfo.title = this.title
                blogInfo.body = this.body
                blogInfo.by = {name: this.user.name, email: this.user.email}
                blogInfo.createdTime = new Date()
                api.createPublicBlogInDataBase({blogInfo: blogInfo})
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha creado el blog en modo public con exito'
                        this.alertType = 'success'
                        this.redirect = '/blog-manager'
                        this.displayAlert = true
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
    watch: {
        data(newValue, oldValue) {
            if (newValue) {
                this.title = newValue.title
                this.body = newValue.body
            }
        },
    },
    mounted() {
        if (this.$route.params.id) {
            this.isEditing = true
            this.displayLoading = true
            api.getBlogById({id: this.$route.params.id})
                .then(product => {
                    this.data = product.data.data
                })
                .then(() => {
                    this.displayLoading = false
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
}
</script>
