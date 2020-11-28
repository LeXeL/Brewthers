<template>
  <div class="q-pa-md">
    <q-table
      title="Casas cerveceras activas"
      :data="data"
      :columns="columns"
      row-key="name"
      dark
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="primary" round dense>
                <i class="fas fa-eye"></i>
            </q-btn>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { name: 'name', align: 'left', label: 'Casa cervecera', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Correo', field: 'email', sortable: true },
      ],
      data: [
        {
          name: 'Casa ABC',
          email: 'casaabc@gmail.com',
        },
      ]
    }
  }
}
</script>