<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="formData.nombre" :rules="nombreRules" label="Nombre" required variant="outlined"
      class="mb-4"></v-text-field>

    <v-text-field v-model="formData.correo" :rules="correoRules" label="Correo Electrónico" required variant="outlined"
      class="mb-4"></v-text-field>

    <v-text-field v-model="formData.telefono" :rules="telefonoRules" label="Teléfono" required variant="outlined"
      class="mb-4"></v-text-field>

    <v-row>
      <v-col>
        <v-btn color="secondary" variant="outlined" @click="$emit('cancelar')" block>
          Cancelar
        </v-btn>
      </v-col>
      <v-col>
        <v-btn :disabled="!valid" color="primary" @click="guardar" block>
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ref, reactive, watch } from 'vue'

export default {
  name: 'ClienteForm',
  props: {
    cliente: {
      type: Object,
      default: () => ({
        nombre: '',
        correo: '',
        telefono: ''
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['guardar', 'cancelar'],
  setup(props, { emit }) {
    const form = ref(null)
    const valid = ref(true)

    // Datos del formulario reactivos
    const formData = reactive({
      nombre: props.cliente.nombre,
      correo: props.cliente.correo,
      telefono: props.cliente.telefono
    })

    // Observar cambios en las props del cliente
    watch(() => props.cliente, (newCliente) => {
      formData.nombre = newCliente.nombre
      formData.correo = newCliente.correo
      formData.telefono = newCliente.telefono
    }, { deep: true })

    // Reglas de validación
    const nombreRules = [
      v => !!v || 'El nombre es requerido',
      v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres'
    ]

    const correoRules = [
      v => !!v || 'El correo es requerido',
      v => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
    ]

    const telefonoRules = [
      v => !!v || 'El teléfono es requerido',
      v => (v && v.length >= 10) || 'El teléfono debe tener al menos 10 caracteres'
    ]

    // Método para guardar
    const guardar = async () => {
      const { valid } = await form.value.validate()

      if (valid) {
        emit('guardar', { ...formData })
      }
    }

    return {
      form,
      valid,
      formData,
      nombreRules,
      correoRules,
      telefonoRules,
      guardar
    }
  }
}
</script>
