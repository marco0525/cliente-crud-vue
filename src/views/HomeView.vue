<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-4">Gestión de Clientes</h1>

        <!-- Lista de clientes -->
        <cliente-list @nuevo="irANuevoCliente" @editar="irAEditarCliente" @eliminar="abrirDialogoEliminar" />

        <!-- Diálogo de confirmación para eliminar -->
        <confirm-dialog v-model="dialogoEliminar" title="Eliminar Cliente"
          :message="`¿Está seguro de que desea eliminar al cliente ${clienteAEliminar?.nombre}?`"
          @confirmar="eliminarCliente" />

        <!-- Snackbar para mensajes -->
        <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
          {{ snackbarMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ClienteList from '@/components/ClienteList.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  name: 'HomeView',
  components: {
    ClienteList,
    ConfirmDialog
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // Estado del componente
    const dialogoEliminar = ref(false)
    const clienteAEliminar = ref(null)
    const snackbar = ref(false)
    const snackbarMessage = ref('')
    const snackbarColor = ref('success')

    // Navegación
    const irANuevoCliente = () => {
      router.push({ name: 'cliente-create' })
    }

    const irAEditarCliente = (id) => {
      router.push({ name: 'cliente-edit', params: { id } })
    }

    // Manejo de eliminación
    const abrirDialogoEliminar = (cliente) => {
      clienteAEliminar.value = cliente
      dialogoEliminar.value = true
    }

    const eliminarCliente = async () => {
      try {
        await store.dispatch('deleteCliente', clienteAEliminar.value.id)
        mostrarMensaje('Cliente eliminado exitosamente', 'success')
      } catch (error) {
        mostrarMensaje(error.message, 'error')
      }
    }

    // Mostrar mensajes
    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbarMessage.value = mensaje
      snackbarColor.value = color
      snackbar.value = true
    }

    return {
      dialogoEliminar,
      clienteAEliminar,
      snackbar,
      snackbarMessage,
      snackbarColor,
      irANuevoCliente,
      irAEditarCliente,
      abrirDialogoEliminar,
      eliminarCliente
    }
  }
}
</script>
