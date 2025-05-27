import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClienteCreate from '../views/ClienteCreate.vue'
import ClienteEdit from '../views/ClienteEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Listado de Clientes' },
  },
  {
    path: '/clientes/nuevo',
    name: 'cliente-create',
    component: ClienteCreate,
    meta: { title: 'Nuevo Cliente' },
  },
  {
    path: '/clientes/editar/:id',
    name: 'cliente-edit',
    component: ClienteEdit,
    meta: { title: 'Editar Cliente' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Actualizar título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'CRUD Clientes'
  next()
})

export default router
