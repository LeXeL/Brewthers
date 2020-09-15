<template>
    <div>
        <q-input
            filled
            dark
            label="Restaurante"
            :value="data.length > 0 ? data[0].restaurantName : 'NaN'"
            readonly
            type="text"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Correo"
            :value="data.length > 0 ? data[0].email : 'NaN'"
            readonly
            type="email"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Celular"
            :value="data.length > 0 ? data[0].contactPhone : 'NaN'"
            readonly
            type="string"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Fecha"
            :value="date ? returnTime(date) : 'NaN'"
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