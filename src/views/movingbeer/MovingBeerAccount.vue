<template>
    <q-page class="pattern-bg">
        <div class="row">
            <div class="col q-pa-lg">
                <div class="text-h4">Nombre del comercio</div>
            </div>
        </div>
        <div class="row">
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
                <q-card flat bordered dark class="text-white full-width">
                    <q-card-section>
                        <div class="row">
                            <div class="col">
                                <div class="text-h6">Informacion general:</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form>
                            <q-input
                                outlined
                                v-model="profileInfo.restName"
                                class="q-mb-md"
                                label="Nombre del restaurante"
                                dark
                                disable
                            />
                            <q-input
                                outlined
                                v-model="profileInfo.contactName"
                                class="q-mb-md"
                                label="Nombre"
                                dark
                                disable
                            />
                            <q-input
                                outlined
                                v-model="profileInfo.contactLastName"
                                class="q-mb-md"
                                label="Apellido"
                                dark
                                disable
                            />
                            <q-input
                                outlined
                                v-model="profileInfo.email"
                                class="q-mb-md"
                                label="Correo"
                                dark
                                disable
                            />
                            <q-input
                                outlined
                                v-model="profileInfo.cellphone"
                                class="q-mb-md"
                                label="Celular"
                                dark
                                disable
                            />
                        </q-form>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions>
                        <q-btn color="primary">Editar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
                <q-card flat bordered dark class="text-white full-width">
                    <q-card-section>
                        <div class="row">
                            <div class="col">
                                <div class="text-h6">Direccion:</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form>
                            <q-input
                                outlined
                                v-model="addressInfo.textAddress"
                                class="q-mb-md"
                                label="Direccion"
                                dark
                                disable
                            />
                            <p>Inser map here</p>
                        </q-form>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions>
                        <q-btn color="primary">Editar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col col-lg-4 col-xs-12 q-pa-lg">
                <q-card flat bordered dark class="text-white full-width">
                    <q-card-section>
                        <div class="row">
                            <div class="col">
                                <div class="text-h6">Seguridad:</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-form>
                            <q-form>
                                <q-input
                                    outlined
                                    type="password"
                                    v-model="passwordInfo.actualPass"
                                    class="q-mb-md"
                                    label="Contraseña actual"
                                    dark
                                    disable
                                />
                            </q-form>
                        </q-form>
                    </q-card-section>
                    <q-separator dark />
                    <q-card-actions>
                        <q-btn color="primary">Editar</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            profileInfo: {
                restName: 'La Casa de Pepe',
                contactName: 'Pepe',
                contactLastName: 'Veraz',
                email: 'pepe.veraz@gmail.com',
                cellphone: '6262-6262',
            },
            addressInfo: {
                textAddress: 'Somewhere in Pma, 3th Street',
            },
            passwordInfo: {
                actualPass: 'asdf123',
                newPass: 'qwe123',
            },
        }
    },
}
/*
nombre del comercio
nombre
apellido
correo
celular
direccion
mapa


*/
</script>