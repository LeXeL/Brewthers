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
        <div class="text-h5 q-mb-md text-white">Administrador de cuentas</div>
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
                <active-accounts-table
                    class="q-mb-md"
                    :data="
                        users.filter(user => {
                            if (
                                user.status === 'approved' &&
                                user.role !== 'admin' &&
                                user.role !== 'brewery'
                            )
                                return user
                        })
                    "
                ></active-accounts-table>
            </div>

            <div class="col-lg-6 col-md-6 col-xs-12 q-pa-md">
                <active-brewing-houses-table
                    class="q-mb-md"
                    :data="
                        users.filter(user => {
                            if (
                                user.status === 'approved' &&
                                user.role === 'brewery'
                            )
                                return user
                        })
                    "
                    @open-new-brewing-houses="openNewBrewingHouses()"
                ></active-brewing-houses-table>
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
                <q-form @submit="createAdmin">
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
                            v-model="adminInfo.name"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            label="Apellido"
                            class="q-mb-md"
                            dark
                            filled
                            type="text"
                            v-model="adminInfo.lastName"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            label="Correo"
                            class="q-mb-md"
                            dark
                            filled
                            type="email"
                            v-model="adminInfo.email"
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
                            v-model="adminInfo.password"
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
                            @click="clearAdminInputs()"
                            v-close-popup
                        />
                        <q-btn flat label="Crear" type="submit" />
                    </q-card-actions>
                </q-form>
            </q-card>
        </q-dialog>

        <q-dialog v-model="brewingHousesRegisterDialog" persistent>
            <q-card dark>
                <q-form @submit="createBrewery()">
                    <q-card-section>
                        <div class="text-h6">
                            Nueva cuenta de casa cervecera
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-select
                            dark
                            filled
                            v-model="breweryInfo.breweryId"
                            :options="brewingHouseOptions"
                            label="Casa cervecera"
                            color="primary"
                            class="q-mb-md"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            dark
                            filled
                            label="RUC"
                            color="primary"
                            class="q-mb-md"
                            v-model="breweryInfo.ruc"
                        />
                        <q-input
                            dark
                            filled
                            label="Nombre"
                            color="primary"
                            class="q-mb-md"
                            v-model="breweryInfo.name"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            dark
                            filled
                            label="Apellido"
                            color="primary"
                            class="q-mb-md"
                            v-model="breweryInfo.lastName"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            dark
                            filled
                            label="Correo"
                            color="primary"
                            class="q-mb-md"
                            v-model="breweryInfo.email"
                            :rules="[
                                val =>
                                    val.length > 0 || 'El campo es obligatorio',
                                val =>
                                    validEmail.test(val) ||
                                    'Formato de correo incorrecto',
                            ]"
                        />
                        <q-input
                            dark
                            filled
                            label="Celular"
                            color="primary"
                            class="q-mb-md"
                            mask="####-####"
                            fill-mask
                            v-model="breweryInfo.phone"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                        <q-input
                            dark
                            filled
                            label="Contraseña"
                            color="primary"
                            class="q-mb-md"
                            type="password"
                            v-model="breweryInfo.password"
                            :rules="[
                                val =>
                                    val.length > 0 || 'El campo es obligatorio',
                                val =>
                                    strongPass.test(val) ||
                                    'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.',
                            ]"
                        />
                        <q-input
                            dark
                            filled
                            label="Repetir la contraseña"
                            color="primary"
                            class="q-mb-md"
                            type="password"
                            v-model="breweryInfo.repassword"
                            :rules="[val => !!val || 'El campo es obligatorio']"
                        />
                    </q-card-section>
                    <q-card-actions>
                        <q-space />
                        <q-btn
                            flat
                            color="secondary"
                            label="Registrar"
                            type="submit"
                        />
                        <q-btn
                            flat
                            color="red-7"
                            label="Cancelar"
                            @click="
                                clearBreweryInputs()
                                brewingHousesRegisterDialog = false
                            "
                        />
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
            adminInfo: {
                name: '',
                lastName: '',
                email: '',
                password: '',
            },
            breweryInfo: {
                name: '',
                lastName: '',
                ruc: '',
                email: '',
                phone: '',
                breweryId: '',
                password: '',
                repassword: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            brewingHousesRegisterDialog: false,
            model: null,
            brewingHouseOptions: [],
        }
    },
    computed: {
        brewerys() {
            return this.$store.getters.brewerys
        },
    },
    watch: {
        brewerys(newValue, oldValue) {
            this.brewingHouseOptions = newValue
                .filter(brewery => brewery.status === 'active')
                .map(brewery => brewery.name)
        },
    },
    methods: {
        openNewBrewingHouses() {
            this.brewingHousesRegisterDialog = true
        },
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
        clearAdminInputs() {
            this.adminInfo = {
                name: '',
                lastName: '',
                email: '',
                password: '',
            }
        },
        clearBreweryInputs() {
            this.breweryInfo = {
                name: '',
                lastName: '',
                ruc: '',
                email: '',
                phone: '',
                breweryId: '',
                password: '',
                repassword: '',
            }
        },
        createAdmin() {
            this.displayLoading = true
            api.createAdminUserInformation({
                obj: this.adminInfo,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha creado la cuenta con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.clearAdminInputs()
                    this.prompt = false
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Error al momento de crear la cuenta de esta casa cervecera'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        createBrewery() {
            this.displayLoading = true
            if (this.breweryInfo.password !== this.breweryInfo.repassword) {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Las Contraseñas no considen!'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            let selectedBrewery = this.brewerys.find(
                brewery => brewery.name === this.breweryInfo.breweryId
            )
            this.breweryInfo.brewingHouseName = selectedBrewery.name
            this.breweryInfo.breweryId = selectedBrewery.id
            this.breweryInfo.status = 'approved'
            api.createBreweryUserInformation({
                obj: this.breweryInfo,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha creado la cuenta con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.brewingHousesRegisterDialog = false
                    this.clearBreweryInputs()
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Error al momento de crear la cuenta de esta casa cervecera'
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
        api.returnAllBrewerys().then(response => {
            this.$store.dispatch('setBrewerys', response.data.data)
        })
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
