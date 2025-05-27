# Sistema de Gestión de Clientes - CRUD Vue 3

## 📋 Descripción

Aplicación web para la gestión de clientes desarrollada con Vue 3, implementando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con simulación de persistencia mediante Vuex.

## 🚀 Características

- ✅ **Listado de clientes** con tabla paginada
- ✅ **Creación de clientes** con validación de formularios
- ✅ **Edición de clientes** existentes
- ✅ **Eliminación de clientes** con confirmación
- ✅ **Validaciones en tiempo real** para todos los campos
- ✅ **Interfaz responsiva** con Material Design
- ✅ **Navegación SPA** con Vue Router
- ✅ **Gestión de estado** centralizada con Vuex

## 🛠️ Tecnologías Utilizadas

- **Vue 3** - Framework JavaScript progresivo
- **Composition API** - API moderna de Vue para componentes
- **Vuex 4** - Gestión de estado centralizada
- **Vue Router 4** - Enrutamiento SPA
- **Vuetify 3** - Componentes UI con Material Design
- **Material Design Icons** - Iconografía

## 📁 Estructura del Proyecto

```
cliente-crud-vue/
├── src/
│   ├── components/
│   │   ├── ClienteForm.vue      # Formulario reutilizable
│   │   ├── ClienteList.vue      # Tabla de clientes
│   │   └── ConfirmDialog.vue    # Diálogo de confirmación
│   ├── views/
│   │   ├── HomeView.vue         # Vista principal con listado
│   │   ├── ClienteCreate.vue    # Vista crear cliente
│   │   └── ClienteEdit.vue      # Vista editar cliente
│   ├── store/
│   │   └── index.js             # Configuración Vuex
│   ├── router/
│   │   └── index.js             # Configuración de rutas
│   ├── plugins/
│   │   └── vuetify.js           # Configuración Vuetify
│   ├── App.vue                  # Componente raíz
│   └── main.js                  # Punto de entrada
├── package.json
└── README.md
```

## 🔧 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn
- Git

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/marco0525/cliente-crud-vue.git
cd cliente-crud-vue
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

4. **Compilar para producción**

```bash
npm run build
```

5. **Previsualizar build de producción**

```bash
npm run preview
```

## 💻 Uso de la Aplicación

### Pantalla Principal

- Muestra la lista de todos los clientes
- Permite acceder a las funciones de crear, editar y eliminar

### Crear Cliente

1. Click en el botón "Nuevo Cliente"
2. Completar el formulario con:
   - **Nombre**: Mínimo 3 caracteres
   - **Correo**: Formato válido de email
   - **Teléfono**: Mínimo 10 caracteres
3. Click en "Guardar" para crear el cliente

### Editar Cliente

1. Click en el ícono de lápiz en la fila del cliente
2. Modificar los datos deseados
3. Click en "Actualizar" para guardar cambios

### Eliminar Cliente

1. Click en el ícono de papelera en la fila del cliente
2. Confirmar la eliminación en el diálogo
3. El cliente será eliminado de la lista

## 🏗️ Arquitectura y Decisiones de Diseño

### Gestión de Estado (Vuex)

- **State**: Almacena la lista de clientes y el próximo ID disponible
- **Getters**: Obtención de clientes y búsqueda por ID
- **Mutations**: Modificaciones síncronas del estado
- **Actions**: Lógica de negocio y validaciones

### Validaciones

- Validación en tiempo real en formularios
- Validación del formato de correo electrónico
- Campos obligatorios marcados y validados
- Mensajes de error descriptivos

### Persistencia

- Datos almacenados en memoria mediante Vuex
- Al recargar la página, se reinician con datos de ejemplo
- En producción, se conectaría a una API REST

## 🚀 Demo

Puedes ver el código fuente completo en: [https://github.com/marco0525/cliente-crud-vue](https://github.com/marco0525/cliente-crud-vue)

## 👨‍💻 Autor

**Marco Antonio** - [@marco0525](https://github.com/marco0525)

Desarrollado como parte de la evaluación técnica para Programador Full Stack.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
