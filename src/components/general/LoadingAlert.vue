<template>
    <q-dialog v-model="display" persistent>
        <q-card dark style="width: auto;">
            <q-card-section>
                <div class="text-h6 q-mr-lg q-mt-sm" style="display: inline-block">CARGANDO</div>
                <q-spinner color="primary" size="3em" :thickness="10" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: ['display'],
}
</script>