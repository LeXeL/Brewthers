<template>
    <div class="pattern-bg contact-form">
        <h2 class="q-ml-md title-section">Contacto</h2>
        <q-form>
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-input color="white" class="q-pa-md" dark filled label="Nombre" />
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-input color="white" class="q-pa-md" dark filled label="Apellido" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-input
                                color="white"
                                class="q-pa-md"
                                dark
                                filled
                                label="Correo electronico"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-select
                                class="q-pa-md"
                                color="white"
                                dark
                                filled
                                :options="options"
                                label="Razon de contacto"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-xs-12">
                    <div class="row">
                        <div class="col">
                            <q-input
                                class="q-pa-md"
                                color="white"
                                dark
                                filled
                                type="textarea"
                                label="Mensaje"
                                rows="10"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row q-pa-md">
                <q-space />
                <q-btn label="Enviar" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                'Alquiler de equipo draft',
                'Solicitar cotización de servicio',
                'MovingBeer',
                'Otros',
            ],
        }
    },
}
</script>

<style></style>
