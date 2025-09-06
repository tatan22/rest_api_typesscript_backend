# 📌 Resumen del Proyecto

El proyecto consiste en la creación de una **REST API con Express y
TypeScript**, siguiendo buenas prácticas de desarrollo backend.

## 🚀 ¿Qué se hizo?

- Se implementó un **servidor con Express.js** configurado para
    manejar rutas y peticiones HTTP.
- Se definieron **endpoints CRUD** (GET, POST, PUT, DELETE, PATCH)
    para gestionar recursos.
- Se configuró **TypeScript** con `tsconfig.json` para compilar y
    organizar el código en `src/`.
- Se aplicaron herramientas de desarrollo como:
  - **Nodemon** → recarga automática en desarrollo.
  - **ESLint** → estandarización del código.
  - **Morgan** → logging de peticiones.
  - **CORS** → control de accesos desde el frontend.
- Se probó la conexión a **PostgreSQL** (vía Supabase) usando un ORM
    (Sequelize).\
- Se integró un proyecto de frontend con **React + TypeScript + Vite +
    TailwindCSS**, conectándose a la API.

### 🛠️ Tecnologías principales

- **Backend**: Node.js, Express, TypeScript\
- **Base de datos**: PostgreSQL (Supabase, con SSL y Session Pooler)\
- **Frontend**: React, Vite, TailwindCSS\
- **Extras**: Nodemon, ESLint, Morgan, CORS

👉 En resumen, es un proyecto **Full Stack con el stack PERN**,
orientado a aprender cómo estructurar e implementar una API REST
moderna, segura y escalable.

## Errores y Soluciones del Proyecto

Este documento resume los principales errores encontrados durante el desarrollo del proyecto y cómo fueron solucionados.

---

### 1. Problemas con CORS

- **Descripción del error**:  
  El frontend no podía comunicarse con el backend debido a restricciones de CORS.  
  El servidor solo permitía solicitudes desde el origen definido en `process.env.FRONTEND_URL`.

- **Solución implementada**:  
  Se añadió un middleware global en el servidor para permitir solicitudes desde cualquier origen:  

  ```ts
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  ```

---

### 2. Ruta PATCH sin respuesta

- **Descripción del error**:  
  La función `updateAvailability` en el frontend realizaba la petición `PATCH`, pero el backend no respondía porque no existía la ruta correspondiente.

- **Solución implementada**:  
  Se agregó en el router del backend la definición de la ruta para manejar actualizaciones:

  ```ts
  router.patch("/:id", controller.update);
  ```

  Con esto el backend procesó correctamente la actualización de la disponibilidad del producto.

---
