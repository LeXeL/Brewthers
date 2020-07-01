<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Detalles de cuenta</div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <div class="row q-mb-md">
                    <q-input
                        filled
                        label="Nombre del restaurante"
                        value="El Fogon de Tia Chencha"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="RUC"
                        value="65-46518656-2019"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="Persona de contacto"
                        value="Chencha Perez"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="Correo"
                        value="tia.chencha@gmail.com"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="Celular"
                        value="6565-6565"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="Direccion"
                        value="Arribita de la Delta"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                    <q-input
                        filled
                        label="Estatus"
                        value="Activa"
                        class="q-mb-md full-width"
                        dark
                        readonly
                    />
                </div>

                <div class="row">
                    <div class="text-h6">Motivos de rechazo o deshabilitacion de cuenta</div>
                    <q-list dark padding class="full-width">
                        <q-item clickable v-ripple>
                            <q-item-section>Motivo de rechazo numero 1</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>Motivo de rechazo numero 2</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>Motivo de rechazo numero 3</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
            <div class="col-lg-8 q-pa-md">
                <GoogleMaps
                    class="full-width q-mb-md"
                    :editable="true"
                    :markers="[{position:{lat:9.08,lng:-47.8}}]"
                    :mapCenter="{lat:9.08,lng:-47.8}"
                ></GoogleMaps>

                <div class="row">
                    <q-space />
                    <q-btn
                        color="warning"
                        text-color="black"
                        label="Deshabilitar"
                        class="on-left"
                        @click="rejectDialog = true"
                    />
                    <q-btn color="secondary" label="Aceptar" class="on-left" />
                    <q-btn color="red-7" label="Reachazar" @click="rejectDialog = true" />
                </div>
            </div>
        </div>
        <q-dialog v-model="rejectDialog" persistent>
            <q-card style="width: 700px; max-width: 80vw;" dark>
                <q-card-section>
                    <div class="text-h6">Motivos</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-option-group
                        :options="options"
                        label="Notifications"
                        type="checkbox"
                        dark
                        v-model="group"
                    />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Confirmar" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps'

export default {
    components: {
        GoogleMaps,
    },
    data() {
        return {
            rejectDialog: false,
            group: [],
            options: [
                {label: 'Motivo de rechazo 1', value: 'op1'},
                {label: 'Motivo de rechazo 2', value: 'op2'},
                {label: 'Motivo de rechazo 3', value: 'op3'},
            ],
        }
    },
}
</script>
<style scoped>
</style>