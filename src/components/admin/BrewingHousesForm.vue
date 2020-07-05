<template>
    <q-card class="my-card text-white full-width" dark>
        <q-card-section>
            <div class="text-h6">Nueva casa cervecera</div>
        </q-card-section>

        <q-card-section>
            <q-input filled dark label="Nombre" class="q-mb-md" />
            <q-file filled dark label="Logo">
                <template v-slot:prepend>
                    <i class="fas fa-paperclip"></i>
                </template>
            </q-file>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
            <q-space />
            <q-btn color="secondary">Guardar</q-btn>
            <q-btn color="red-7">Cancelar</q-btn>
        </q-card-actions>
    </q-card>
</template>