<template>
    <q-page>
        <div class="pattern-bg q-pa-xl" style="height: 100vh">
            <h2>Crea una cuenta</h2>
            <q-form>
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Apellido"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="email"
                    label="Email"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Nombre del restaurante"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="text"
                    label="Celular de contacto"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="password"
                    label="Contraseña"
                />
                <q-input
                    class="q-pb-md"
                    dark
                    filled
                    type="password"
                    label="Confirmar contraseña"
                />
                <q-btn color="primary">Enviar</q-btn>
            </q-form>
        </div>
    </q-page>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
