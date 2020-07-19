<template>
    <div>
        <q-input
            filled
            dark
            label="Total de articulos"
            value="30"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Monto de venta"
            value="150.50"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input filled dark label="ITBMS" value="15.50" readonly type="number" class="q-mb-md" />
        <q-input
            filled
            dark
            label="Total a cobrar"
            value="130.60"
            readonly
            type="number"
            class="q-mb-md"
        />
        <q-input
            filled
            dark
            label="Estado actual"
            value="En revision"
            readonly
            type="text"
            class="q-mb-md"
        />
        <div class="row">
            <q-space />
            <q-btn color="red-7" class="on-left" label="cancelar" />
            <q-btn color="secondary" label="continuar" />
        </div>
    </div>
</template>