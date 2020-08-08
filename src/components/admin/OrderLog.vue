<template>
    <q-list dark class="rounded-borders">
        <q-item clickable v-for="(el, i) in data" :key="i">
            <q-item-section>
                <span>{{ formatLog(el) }}</span>
                <ul v-if="Array.isArray(el.section)">
                    <li v-for="(r, i) in el.section" :key="i">{{ r }}</li>
                </ul>
            </q-item-section>
        </q-item>
    </q-list>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    methods: {
        formatLog(el) {
            if (typeof el == 'number') {
                let s = `Orden creada: ${new Date(el)}`
                return s
            } else {
                if (el.action == 'Changed Status') {
                    let s = `Cambio de estado: ${el.section} - por: ${
                        el.who
                    } - Fecha: ${new Date(el.time)}`
                    return s
                }
                if (el.action == 'Upload Proof') {
                    let s = ` Se subio un comprobante de pago - Por: ${
                        el.who
                    } - Fecha: ${new Date(el.time)}`
                    return s
                } else {
                    if (el.action == 'Cancel Order') {
                        let s = `Se cancelo la orden - Por: ${
                            el.who
                        } - Fecha: ${new Date(el.time)}`
                        return s
                    }
                }
            }
        },
    },
}
</script>