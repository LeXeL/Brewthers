<template>
    <div>
        <q-input
            filled
            dark
            label="Restaurante"
            :value="data[0].restaurantName"
            readonly
            type="text"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Correo"
            :value="data[0].email"
            readonly
            type="email"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Celular"
            :value="data[0].contactPhone"
            readonly
            type="string"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Fecha"
            :value="returnTime(date)"
            readonly
            type="sting"
            class="q-mb-md"
        />
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
        date: {
            type: Number,
            default: new Date(),
        },
    },
    methods: {
        returnTime(time) {
            return moment(time).format('MMMM DD YYYY')
        },
    },
}
</script>