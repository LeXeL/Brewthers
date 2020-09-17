<template>
    <q-page class="q-pa-md">
        <div class="text-h5 q-mb-md">Administrador de blog</div>
        <div class="row q-pa-md">
            <q-space />
            <q-btn color="secondary" label="Redactar" to="/blog-writer" />
        </div>
        <div class="row">
            <div class="col-lg-12 col-xs-12 q-pa-md">
                <q-table
                    title="Blogs"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :pagination.sync="initialPagination"
                    binary-state-sort
                    dark
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">{{ props.row.title }}</q-td>
                            <q-td key="author" :props="props">{{ props.row.by.name }}</q-td>
                            <q-td key="date" :props="props">{{ returnTime(props.row.createdTime) }}</q-td>
                            <q-td key="status" :props="props">
                                <q-badge
                                    :color="props.row.status == 'draft' ? 'warning' : 'secondary'"
                                >{{ props.row.status }}</q-badge>
                            </q-td>

                            <q-td>
                                <q-btn
                                    color="info"
                                    size="xs"
                                    :props="props"
                                    label="editar"
                                    :to="`/blog-writer/${props.row.id}`"
                                />
                            </q-td>
                            <q-td>
                                <q-btn color="red-7" size="xs" label="eliminar" />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

import * as api from '@/api/api'
export default {
    data() {
        return {
            initialPagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 15,
                // rowsNumber: xx if getting data from a server
            },
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'author',
                    required: true,
                    label: 'Autor',
                    align: 'left',
                    field: 'author',
                    sortable: true,
                },
                {
                    name: 'date',
                    align: 'left',
                    label: 'Fecha',
                    field: 'date',
                    sortable: true,
                },
                {
                    name: 'status',
                    align: 'left',
                    label: 'Estatus',
                    field: 'status',
                    sortable: true,
                },
                {
                    label: 'Editar',
                    align: 'left',
                },
                {
                    label: 'Eliminar',
                    align: 'left',
                },
            ],
            data: [],
            status: [
                {
                    text: 'Por revisar',
                    color: 'amber-9',
                },
                {
                    text: 'En preparacion',
                    color: 'yellow-9',
                },
                {
                    text: 'En camino',
                    color: 'lime-8',
                },
                {
                    text: 'Entregado',
                    color: 'light-green-9',
                },
                {
                    text: 'Completado',
                    color: 'secondary',
                },
                {
                    text: 'Cancelada',
                    color: 'red-7',
                },
            ],
        }
    },
    methods: {
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY')
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
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('blog').onSnapshot(
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
    },
}
</script>