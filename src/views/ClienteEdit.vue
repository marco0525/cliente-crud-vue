<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card v-if="cliente">
          <v-card-title>
            <h2 class="text-h5">Editar Cliente</h2>
          </v-card-title>

          <v-card-text>
            <cliente-form :cliente="cliente" :is-edit="true" @guardar="actualizarCliente" @cancelar="cancelar" />
          </v-card-text>
        </v-card>

        <!-- Mensaje de carga -->
        <v-card v-else>
          <v-card-text>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Cargando cliente...</span>
          </v-card-text>
        </v-card>

        <!-- Snackbar para mensajes -->
        <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
          {{ snackbarMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ClienteForm from '@/components/ClienteForm.vue'

export default {
  name: 'ClienteEdit',
  components: {
    ClienteForm
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    // Estado para mensajes
    const snackbar = ref(false)
    const snackbarMessage = ref('')
    const snackbarColor = ref('success')

    // Obtener cliente del store
    const cliente = computed(() => {
      const id = parseInt(route.params.id)
      return store.getters.getClienteById(id)
    })

    // Verificar si el cliente existe al montar
    onMounted(() => {
      if (!cliente.value) {
        mostrarMensaje('Cliente no encontrado', 'error')
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 2000)
      }
    })

    // Actualizar cliente
    const actualizarCliente = async (datosCliente) => {
      try {
        const clienteActualizado = {
          ...datosCliente,
          id: cliente.value.id
        }

        await store.dispatch('updateCliente', clienteActualizado)
        mostrarMensaje('Cliente actualizado exitosamente', 'success')

        // Redirigir después de un delay para simular la carga
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 1500)
      } catch (error) {
        mostrarMensaje(error.message, 'error')
      }
    }

    // Cancelar y volver
    const cancelar = () => {
      router.push({ name: 'home' })
    }

    // Mostrar mensajes
    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbarMessage.value = mensaje
      snackbarColor.value = color
      snackbar.value = true
    }

    return {
      cliente,
      snackbar,
      snackbarMessage,
      snackbarColor,
      actualizarCliente,
      cancelar
    }
  }
}
</script>
