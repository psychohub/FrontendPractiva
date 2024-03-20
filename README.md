# Proyecto Wallapop Frontend

Este proyecto es una aplicación frontend que simula la funcionalidad básica de la plataforma de compraventa Wallapop. La aplicación permite a los usuarios ver, crear, editar y eliminar anuncios, así como realizar búsquedas y filtrar los anuncios según varios criterios.

## Tecnologías Utilizadas

- **JavaScript**: Lógica del lado del cliente.
- **HTML**: Estructura de la aplicación.
- **CSS**: Estilos de la aplicación.
- **Bootstrap 5**: Framework de CSS para diseño responsivo y componentes de interfaz.
- **Sparrest.js**: API simulada para el backend.

## Patrón de Diseño

El proyecto sigue el patrón de diseño Modelo-Vista-Controlador (MVC):

- **Modelo**: Gestiona la lógica de negocio y la comunicación con la API de Sparrest.js.
- **Vista**: Se encarga de mostrar los datos y la interacción con el usuario.
- **Controlador**: Actúa como el intermediario entre el Modelo y la Vista.

## Funcionalidades Principales

- **Listado de anuncios**: Visualización de anuncios con detalles como imagen, título, descripción, precio y tipo.
- **Detalles de anuncio**: Vista detallada de un anuncio con opciones de edición y eliminación para usuarios autenticados.
- **Creación de anuncios**: Interfaz para que los usuarios autenticados creen nuevos anuncios.
- **Edición y eliminación de anuncios**: Funcionalidades para modificar o eliminar anuncios propios.
- **Búsqueda y filtrado de anuncios**: Herramientas para buscar anuncios por título, descripción y tipo.
- **Autenticación de usuarios**: Registro e inicio de sesión utilizando tokens JWT.

## Configuración del Proyecto

1. Clona el repositorio en tu máquina local.
2. Asegúrate de tener Node.js y npm instalados.
3. Instala las dependencias con `npm install`.
4. Inicia el servidor de desarrollo con `npm start`.
5. Abre [http://localhost:5500](http://localhost:5500) en tu navegador.

## API Sparrest.js

Este proyecto utiliza Sparrest.js, una API que simula operaciones de backend y proporciona datos de ejemplo.

Para configurar Sparrest.js:

1. Instala Sparrest.js globalmente con `npm install`.
2. Crea un archivo `db.json` en la raíz del proyecto.
3. Ejecuta el servidor con `npm start`.

## Endpoints Principales

- `POST /auth/register`: Registro de nuevos usuarios.
- `POST /auth/login`: Inicio de sesión y obtención de JWT.
- `GET /api/ads`: Lista de todos los anuncios.
- `POST /api/ads`: Creación de un nuevo anuncio (requiere autenticación).
- `PUT /api/ads/:id`, `DELETE /api/ads/:id`: Actualización y eliminación de anuncios (requiere autenticación).

## Consideraciones de Accesibilidad

Se han aplicado prácticas de accesibilidad como el uso de etiquetas semánticas, contraste adecuado, tamaños de fuente legibles, compatibilidad con lectores de pantalla y navegación por teclado para hacer la aplicación más accesible.

---

