<template>
    <q-card class="my-card text-white full-width" dark>
        <q-card-section>
            <div class="text-h6">Nuevo articulo</div>
        </q-card-section>

        <q-card-section>
            <q-input filled dark label="Nombre" type="text" class="q-mb-md" />
            <q-select filled class="q-mb-md" dark :options="styles" label="Estilo" />
            <q-select filled class="q-mb-md" dark :options="presentations" label="Presentacion" />
            <q-select filled class="q-mb-md" dark :options="houses" label="Casa" />
            <q-input filled dark label="ABV" type="number" class="q-mb-md" />
            <q-input filled dark label="IBU" type="number" class="q-mb-md" />
            <q-input filled dark label="Descripcion" type="textarea" class="q-mb-md" />
            <q-file filled dark label="Foto" class="q-mb-md">
                <template v-slot:prepend>
                    <i class="fas fa-paperclip"></i>
                </template>
            </q-file>
            <q-input filled dark label="Precio" type="number" class="q-mb-md" />
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
            <q-space />
            <q-btn color="secondary">Guardar</q-btn>
            <q-btn color="red-7">Cancelar</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            model: null,
            styles: ['style 1', 'style 2', 'style 3', 'style 4', 'style 5'],
            presentations: ['KEG', 'Caja'],
            houses: ['House A', 'House B', 'House C'],
        }
    },
}
</script>