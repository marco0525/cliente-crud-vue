<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">Nuevo Cliente</h2>
          </v-card-title>

          <v-card-text>
            <cliente-form @guardar="crearCliente" @cancelar="cancelar" />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ClienteForm from '@/components/ClienteForm.vue'

export default {
  name: 'ClienteCreate',
  components: {
    ClienteForm
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // Estado para mensajes
    const snackbar = ref(false)
    const snackbarMessage = ref('')
    const snackbarColor = ref('success')

    // Crear nuevo cliente
    const crearCliente = async (cliente) => {
      try {
        await store.dispatch('createCliente', cliente)
        mostrarMensaje('Cliente creado exitosamente', 'success')

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
      snackbar,
      snackbarMessage,
      snackbarColor,
      crearCliente,
      cancelar
    }
  }
}
</script>
