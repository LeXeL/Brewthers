<template>
<q-dialog v-model="confirm">
      <q-card dark>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ message }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Aceptar" color="secondary" v-close-popup />
          <q-btn label="Cancelar" color="red-7" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
    export default {
        props: ['title', 'message', 'display'],
        data() {
            return {
                confirm: true
            }
        }
    }
</script>