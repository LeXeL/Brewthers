<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Detalles de cuenta</div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <q-input
                    filled
                    label="Nombre del restaurante"
                    value="El Fogon de Tia Chencha"
                    class="q-mb-md"
                    dark
                    disable
                />
                <q-input filled label="RUC" value="65-46518656-2019" class="q-mb-md" dark disable />
                <q-input
                    filled
                    label="Persona de contacto"
                    value="Chencha Perez"
                    class="q-mb-md"
                    dark
                    disable
                />
                <q-input
                    filled
                    label="Correo"
                    value="tia.chencha@gmail.com"
                    class="q-mb-md"
                    dark
                    disable
                />
                <q-input filled label="Celular" value="6565-6565" class="q-mb-md" dark disable />
                <q-input
                    filled
                    label="Direccion"
                    value="Arribita de la Delta"
                    class="q-mb-md"
                    dark
                    disable
                />
            </div>
            <div class="col-lg-8 q-pa-md">
                <div class="row q-mb-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.850840989894!2d-79.51440278464861!3d8.98586989213582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca90318b2d289%3A0x6c3da9deb445c2dd!2sMultiplaza!5e0!3m2!1sen!2spa!4v1593540947688!5m2!1sen!2spa"
                        width="100%"
                        height="550"
                        frameborder="0"
                        style="border:0;"
                        allowfullscreen
                        aria-hidden="false"
                        tabindex="0"
                    ></iframe>
                </div>
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
                    <q-input filled v-model="address" autofocus @keyup.enter="prompt = false" dark />
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
export default {
    data() {
        return {
            rejectDialog: false,
        }
    },
}
</script>