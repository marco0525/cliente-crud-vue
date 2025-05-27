<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="cancelar">
          Cancelar
        </v-btn>
        <v-btn color="error" variant="text" @click="confirmar">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'ConfirmDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirmar acción'
    },
    message: {
      type: String,
      default: '¿Está seguro de que desea realizar esta acción?'
    }
  },
  emits: ['update:modelValue', 'confirmar'],
  setup(props, { emit }) {
    const dialog = ref(props.modelValue)

    // Sincronizar el valor del diálogo con el v-model
    watch(() => props.modelValue, (newValue) => {
      dialog.value = newValue
    })

    watch(dialog, (newValue) => {
      emit('update:modelValue', newValue)
    })

    const confirmar = () => {
      emit('confirmar')
      dialog.value = false
    }

    const cancelar = () => {
      dialog.value = false
    }

    return {
      dialog,
      confirmar,
      cancelar
    }
  }
}
</script>
