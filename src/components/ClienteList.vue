<template>
  <v-data-table :headers="headers" :items="clientes" :items-per-page="5" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('nuevo')" prepend-icon="mdi-plus">
          Nuevo Cliente
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="$emit('editar', item.id)" color="primary">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="$emit('eliminar', item)" color="error">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-alert type="info" variant="outlined" class="ma-4">
        No hay clientes registrados
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ClienteList',
  emits: ['nuevo', 'editar', 'eliminar'],
  setup() {
    const store = useStore()

    // Obtener clientes del store
    const clientes = computed(() => store.getters.allClientes)

    // Definir headers de la tabla
    const headers = [
      { title: 'ID', key: 'id', align: 'start' },
      { title: 'Nombre', key: 'nombre' },
      { title: 'Correo Electrónico', key: 'correo' },
      { title: 'Teléfono', key: 'telefono' },
      { title: 'Acciones', key: 'actions', sortable: false, align: 'center' }
    ]

    return {
      clientes,
      headers
    }
  }
}
</script>
