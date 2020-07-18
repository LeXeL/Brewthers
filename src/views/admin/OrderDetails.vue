<template>
    <div class="q-pa-md">
        <div class="text-h5 q-mb-md">Orden No. 123456</div>
        <div class="row">
            <div class="col">
                <q-input
                    filled
                    dark
                    label="Restaurante"
                    value="La Cocina de Pepe"
                    readonly
                    type="text"
                    class="q-mb-md"
                />
                <q-input
                    filled
                    dark
                    label="Correo"
                    value="cocina.de.pepe@gmail.com"
                    readonly
                    type="email"
                    class="q-mb-md"
                />
                <q-input
                    filled
                    dark
                    label="Celular"
                    value="6262622"
                    readonly
                    type="number"
                    class="q-mb-md"
                />
                <q-input
                    filled
                    dark
                    label="Fecha"
                    value="2020-01-15"
                    readonly
                    type="date"
                    class="q-mb-md"
                />
                <q-input
                    filled
                    dark
                    label="Metodo de pago"
                    value="ACH"
                    readonly
                    type="text"
                    class="q-mb-md"
                />
            </div>
        </div>
    </div>
</template>