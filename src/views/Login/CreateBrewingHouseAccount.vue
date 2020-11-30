<template>
  <q-page class="pattern-bg q-pa-xl" style="height: auto; background-repeat: repeat-y;">
    <generic-navbar />
    <div class="row">
      <div class="col desktop-only"></div>
      <div class="col-lg-4">
        <q-card dark class="full-width q-mt-xl">
          <q-card-section class="text-center">
            <q-img :src="require('@/assets/brewthers-logo.png')" style="width: 150px"/>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">
              ¿Quieres vender tus productos con nosotros?
              <br/>
              Llena el siguiente formulario para solicitar tu cuenta.
            </div>
          </q-card-section>
          <q-card-section>
            <q-input filled color="primary" label="Nombre de casa cervecera" dark class="q-mb-md"/>
            <q-input filled color="primary" label="RUC" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Nombre" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Apellido" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Correo" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Celular" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Contraseña" dark class="q-mb-md"/>
            <q-input filled color="primary" label="Repetir contraseña" dark class="q-mb-md"/>
          </q-card-section>
          <q-card-actions>
            <q-space/>
            <q-btn label="Registrar" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col desktop-only"></div>
    </div>
  </q-page>
</template>

<script>
import GenericNavbar from '@/components/general/GenericNavbar'
export default {
    components: {
        GenericNavbar,
    },
}
</script>