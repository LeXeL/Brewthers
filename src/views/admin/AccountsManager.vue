<template>
    <div class="q-pa-md" v-if="!!users">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></brewthers-alert>
        <div class="text-h5 q-mb-md">Administrador de cuentas</div>
        <div class="row q-mb-lg">
            <div class="col-lg-6 col-md-6 col-xs-12 q-pa-md">
                <pending-accounts-table
                    :data="
                        users.filter(user => {
                            if (
                                user.status === 'pending' ||
                                (user.status === 'rejected' &&
                                    user.role !== 'admin')
                            )
                                return user
                        })
                    "
                ></pending-accounts-table>
                <active-accounts-table class="q-mb-md"
                    :data="
                        users.filter(user => {
                            if (
                                user.status === 'approved' &&
                                user.role !== 'admin'
                            )
                                return user
                        })
                    "
                ></active-accounts-table>
            </div>
            <div class="col-lg-6 col-md-6 col-xs-12 q-pa-md">
                <active-brewing-houses-table class="q-mb-md"></active-brewing-houses-table>
                <admin-accounts-table
                    :data="
                        users.filter(user => {
                            if (user.role === 'admin') return user
                        })
                    "
                    @openDialog="openNewAdminAccountDialog"
                />
            </div>
        </div>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px" dark>
                <q-form @submit="createadmin">
                    <q-card-section>
                        <div class="text-h6">Nueva cuenta de administrador</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input
                            label="Nombre"
                            class="q-mb-md"
                            dark
                            filled
                            type="text"
                            v-model="adminName"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            label="Apellido"
                            class="q-mb-md"
                            dark
                            filled
                            type="text"
                            v-model="adminLastName"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            label="Correo"
                            class="q-mb-md"
                            dark
                            filled
                            type="email"
                            v-model="adminEmail"
                            :rules="[
                                val =>
                                    val.length > 0 || 'El campo es obligatorio',
                                val =>
                                    validEmail.test(val) ||
                                    'Formato de correo incorrecto',
                            ]"
                        />
                        <q-input
                            label="Contraseña"
                            class="q-mb-md"
                            dark
                            filled
                            type="password"
                            v-model="adminPassword"
                            :rules="[
                                val =>
                                    val.length > 0 || 'El campo es obligatorio',
                                val =>
                                    strongPass.test(val) ||
                                    'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.',
                            ]"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn
                            flat
                            label="Cancelar"
                            @click="clearadmin()"
                            v-close-popup
                        />
                        <q-btn flat label="Crear" type="submit" />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import * as api from '@/api/api'

import ActiveAccountsTable from '@/components/admin/ActiveAccountsTable'
import PendingAccoutsTable from '@/components/admin/PendingAccountsTable'
import AdminAccountsTable from '@/components/admin/AdminAccountsTable'
import ActiveBrewingHousesTable from '@/components/admin/ActiveBrewingHousesTable'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default {
    data() {
        return {
            prompt: false,
            users: [],
            adminName: '',
            adminLastName: '',
            adminEmail: '',
            adminPassword: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    methods: {
        openNewAdminAccountDialog() {
            this.prompt = true
        },
        addToUsers(id, data) {
            let name = data.name + ' ' + data.lastName
            data.name = name
            data.id = id
            this.users.push(data)
        },
        editInUsers(id, data) {
            let name = data.name + ' ' + data.lastName
            data.name = name
            data.id = id
            this.users.forEach((user, index) => {
                if (user.id === id) {
                    this.users.splice(index, 1, data)
                }
            })
        },
        removeInUsers(id) {
            this.users.forEach((user, index) => {
                if (user.id === id) {
                    this.users.splice(index, 1)
                }
            })
        },
        clearadmin() {
            this.adminName = ''
            this.adminLastName = ''
            this.adminEmail = ''
            this.adminPassword = ''
        },
        createadmin() {
            this.displayLoading = true
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.adminEmail,
                    this.adminPassword
                )
                .then(async user => {
                    await api
                        .createuserondatabase({user: user.user})
                        .then(async () => {
                            await api
                                .updateadmininformation({
                                    uid: user.user.uid,
                                    obj: {
                                        name: this.adminName,
                                        lastName: this.adminLastName,
                                    },
                                })
                                .then(() => {
                                    this.displayLoading = false
                                    this.alertTitle = 'Exito!'
                                    this.alertMessage =
                                        'Se ha creado la cuenta con exito'
                                    this.alertType = 'success'
                                    this.displayAlert = true
                                    this.prompt = false
                                })
                                .catch(error => {
                                    this.displayLoading = false
                                    this.alertTitle = 'Error'
                                    this.alertMessage = error
                                    this.alertType = 'error'
                                    this.displayAlert = true
                                })
                        })
                })
                .catch(error => {
                    // Handle Errors here.
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error.message
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    components: {
        'active-accounts-table': ActiveAccountsTable,
        'pending-accounts-table': PendingAccoutsTable,
        'admin-accounts-table': AdminAccountsTable,
        'active-brewing-houses-table': ActiveBrewingHousesTable,
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('users').onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editInUsers(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeInUsers(change.doc.id)
                    }
                })
            },
            error => {
                console.log(error)
            }
        )
    },
}
</script>
