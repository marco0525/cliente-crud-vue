import { createStore } from 'vuex'

export default createStore({
  state: {
    clientes: [
      {
        id: 1,
        nombre: 'Marco Antonio Méndez',
        correo: 'marco@mail.com',
        telefono: '123-456-7890',
      },
      {
        id: 2,
        nombre: 'Rosa María López',
        correo: 'rosa@mail.com',
        telefono: '098-765-4321',
      },
    ],
    nextId: 3,
  },

  getters: {
    // Obtener todos los clientes
    allClientes: (state) => state.clientes,

    // Obtener cliente por ID
    getClienteById: (state) => (id) => {
      return state.clientes.find((cliente) => cliente.id === parseInt(id))
    },
  },

  mutations: {
    // Agregar nuevo cliente
    ADD_CLIENTE(state, cliente) {
      state.clientes.push({
        ...cliente,
        id: state.nextId++,
      })
    },

    // Actualizar cliente existente
    UPDATE_CLIENTE(state, clienteActualizado) {
      const index = state.clientes.findIndex((c) => c.id === clienteActualizado.id)
      if (index !== -1) {
        state.clientes.splice(index, 1, clienteActualizado)
      }
    },

    // Eliminar cliente
    DELETE_CLIENTE(state, id) {
      state.clientes = state.clientes.filter((c) => c.id !== id)
    },
  },

  actions: {
    // Crear cliente con validación
    createCliente({ commit }, cliente) {
      return new Promise((resolve, reject) => {
        try {
          // Simular validación del lado del servidor
          if (!cliente.nombre || !cliente.correo || !cliente.telefono) {
            throw new Error('Todos los campos son obligatorios')
          }

          // Validar formato de correo
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(cliente.correo)) {
            throw new Error('El formato del correo electrónico no es válido')
          }

          commit('ADD_CLIENTE', cliente)
          resolve({ success: true, message: 'Cliente creado exitosamente' })
        } catch (error) {
          reject(error)
        }
      })
    },

    // Actualizar cliente con validación
    updateCliente({ commit, state }, cliente) {
      return new Promise((resolve, reject) => {
        try {
          // Verificar que el cliente existe
          const exists = state.clientes.find((c) => c.id === cliente.id)
          if (!exists) {
            throw new Error('Cliente no encontrado')
          }

          // Validar campos
          if (!cliente.nombre || !cliente.correo || !cliente.telefono) {
            throw new Error('Todos los campos son obligatorios')
          }

          // Validar formato de correo
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(cliente.correo)) {
            throw new Error('El formato del correo electrónico no es válido')
          }

          commit('UPDATE_CLIENTE', cliente)
          resolve({ success: true, message: 'Cliente actualizado exitosamente' })
        } catch (error) {
          reject(error)
        }
      })
    },

    // Eliminar cliente
    deleteCliente({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        try {
          const exists = state.clientes.find((c) => c.id === id)
          if (!exists) {
            throw new Error('Cliente no encontrado')
          }

          commit('DELETE_CLIENTE', id)
          resolve({ success: true, message: 'Cliente eliminado exitosamente' })
        } catch (error) {
          reject(error)
        }
      })
    },
  },
})
