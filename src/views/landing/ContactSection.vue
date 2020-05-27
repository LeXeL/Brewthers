<template>
    <div class="pattern-bg contact-form">
        <q-form>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <q-input class="q-pa-md" color="white" dark filled label="Nombre" />
                    </div>
                    <div class="col">
                        <q-input class="q-pa-md" color="white" dark filled label="Apellido" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <q-input
                            class="q-pa-md"
                            color="white"
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
            <div class="col">
                <div class="row">
                    <div class="col">
                        <q-input
                            class="q-pa-md"
                            color="white"
                            dark
                            filled
                            type="textarea"
                            label="Mensaje"
                        />
                    </div>
                </div>
            </div>
        </q-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        }
    },
}
</script>

<style></style>
