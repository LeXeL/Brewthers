<template>
    <div>
        <div class="row q-px-md q-py-sm">
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="amber-9" size="sm" class="q-mb-sm">
                    <i class="fas fa-box q-mr-xs"></i>Por Revisar
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="grey-6" size="sm" class="q-mb-sm">
                    <i class="fas fa-boxes q-mr-xs"></i>En Preparacion
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="grey-6" size="sm" class="q-mb-sm">
                    <i class="fas fa-truck q-mr-xs"></i>En Camino
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="grey-6" size="sm" class="q-mb-sm">
                    <i class="fas fa-truck-loading q-mr-xs"></i>Entregado
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="grey-6" size="sm" class="q-mb-sm">
                    <i class="fas fa-check q-mr-xs"></i>Completado
                </q-btn>
            </div>
            <div class="col-lg-2 col-sm-4 col-xs-6">
                <q-btn color="red-7" size="sm" @click="cancelationModal = true">
                    <i class="fas fa-times q-mr-xs"></i>Cancelar
                </q-btn>
            </div>
        </div>
        <q-dialog v-model="cancelationModal">
            <q-card style="width: 700px; max-width: 80vw;" dark>
                <q-card-section>
                    <div class="text-h6">
                        Seleccione los motivos de cancelacion de orden
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-option-group
                        :options="cancelationReasons"
                        label="Notifications"
                        type="checkbox"
                        v-model="group"
                        dark
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn label="Confirmar" color="secondary" v-close-popup />
                    <q-btn label="Cancelar" color="red-7" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- <div class="row q-px-md">
            <q-btn color="red-7" class="on-left" @click="cancelationModal = true">
                <i class="fas fa-times"></i>
            </q-btn>
            <q-btn color="warning" class="on-left">
                <i class="fas fa-long-arrow-alt-left"></i>
            </q-btn>
            <q-btn color="secondary">
                <i class="fas fa-long-arrow-alt-right"></i>
            </q-btn>
        </div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            cancelationModal: false,
            group: [],
            cancelationReasons: [
                {label: 'This is cancelation reason 1', value: 'bat'},
                {label: 'This is cancelation reason 2', value: 'friend'},
                {label: 'This is cancelation reason 3', value: 'upload'},
            ],
        }
    },
}
</script>
