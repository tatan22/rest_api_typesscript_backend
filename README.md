# 🚀 REST API's con Express y TypeScript

👤 **Autor:** Jhonatan Cardona Duarte `@tatancarduar`

---

## ❓ ¿Qué es una REST API?

Una **API REST** (Representational State Transfer - Application Programming Interface) es un conjunto de reglas que permite que las aplicaciones se comuniquen entre sí a través de la web. Puede ser creada en cualquier lenguaje que soporte HTTP, pero en este caso usamos **TypeScript** y **Express**.

### Métodos principales

- **GET**: Obtener información 📄
- **POST**: Crear información ➕
- **PUT**: Actualizar información 🔁
- **DELETE**: Eliminar información ❌

### Otros métodos

- `PATCH`: Actualización parcial ⚙️
- `HEAD`, `OPTIONS`, `TRACE`, `CONNECT`

---

## 🌐 Endpoints de una REST API

Una API REST expone **URLs** llamadas *endpoints* para operaciones CRUD:

- `GET /clients` → Listar todos los clientes
- `GET /clients/:id` → Obtener un cliente
- `POST /clients` → Crear un cliente
- `PUT /clients/:id` → Actualizar un cliente
- `DELETE /clients/:id` → Eliminar un cliente

📦 En el cliente (ej. React) se puede consumir la API con **Axios**.

---

## ✅ Ventajas de una REST API

- Fácil de implementar ⚙️
- Escalable y ordenada 🧱
- Compatible con múltiples frontend: React, Angular, Vue, Flutter, etc 📱

---

## 🛠️ Herramientas para crear una REST API

### Lenguajes

- Node.js
- Python
- Java
- Ruby
- PHP
- Go
- C#

### Frameworks

- Express (Node.js)
- Laravel (PHP)
- Rails (Ruby)
- Django (Python)

### Base de datos

- MySQL
- PostgreSQL
- SQL Server
- Oracle

🎯 Algunos frameworks funcionan mejor con ciertas bases de datos.

---

## 🔗 Stack Tecnológico: PERN

> PERN = PostgreSQL + Express + React + Node.js

Un **stack** es un conjunto de herramientas para crear una app **Full Stack**:

- **Frontend**: React
- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL

🎉 También puedes usar otras combinaciones como MERN (Mongo), T3 Stack, etc.

---

## 📚 ¿Qué es PostgreSQL?

PostgreSQL es un sistema de base de datos relacional, orientado a objetos y open source.

👉 Se recomienda usar un **ORM** (Object Relational Mapper) para facilitar las operaciones CRUD sin escribir queries manuales.

---

## 🚀 Express.js

- Framework rápido, minimalista y flexible para Node.js
- No incluye ORM ni vistas por defecto
- Ideal para crear REST APIs

---

## ⚛️ React

- Librería de JavaScript para construir interfaces de usuario
- Permite crear SPAs (Single Page Applications)

---

## 🌐 Node.js

- Entorno de ejecución de JavaScript en el servidor
- Veloz, escalable y con miles de librerías vía NPM

---

## 🎯 Ventajas del stack PERN

- Separación clara entre frontend y backend
- Comunicación vía JSON y peticiones HTTP
- Ecosistema NPM
- Solo necesitas JavaScript/TypeScript para fullstack 👨‍💻

---

## 🧱 Instalación de dependencias del proyecto

```bash
npm init

```

1. Llena los datos del proyecto → Se genera `package.json`
2. Crea la carpeta `src/` con:
    - `index.ts`
    - `server.ts`
    - `app.ts`
3. Usa handlers para enrutamiento
4. Ejecutar:

```bash
ts-node src/index.ts

```

(O instalar `ts-node` globalmente)

---

## ⚙️ Transpilar TypeScript a JavaScript

### 1. Instala dependencias

```bash
npm install -D typescript ts-node

```

### 2. Crea `tsconfig.json`

```json
{}

```

### 3. Elimina `"type": "module"` de `package.json` si genera errores

---

## 🔁 Instalar Nodemon

```bash
npm install -D nodemon

```

### Agrega script en `package.json`

```json
"scripts": {
  "dev": "nodemon src/server.ts"
}

```

---

## 🧪 Extras y recomendaciones

- Instalar ESLint:

```bash
npx eslint --init

```

- Organiza el código por capas (MVC, servicios, controladores) si el proyecto crece.

---

## 🧮 Proyecto: Contador de Calorías, Consumo y Ejercicio con useReducer

Este proyecto calcula calorías consumidas y ejercicio realizado, con persistencia en `localStorage`.

---

## 🚀 Tecnologías Usadas

- ⚛️ React
- ✨ TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧹 ESLint

---

## 🔧 Funcionalidades

- Calculadora de calorías y ejercicio
- Botón de reinicio
- Guardado con `localStorage`

---

## ⚙️ Creación del Proyecto

```bash
npm create vite@latest
cd 06-calorie-tracker
npm install
npm run dev

```

---

## 🧼 Limpieza de Proyecto

1. Ejecutar `npx eslint --init`
2. Eliminar `assets`, `App.css`
3. Limpiar `App.tsx` (dejar solo "Hola Mundo")
4. En `index.css` agregar:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

---

## 🔁 Implementación de Nodemon

```bash
npx nodemon src/index.ts

```

### 🆕 Con Node.js (modo watch)

```bash
node --watch src/index.ts

```

❗ *Nota:* No aplica para `.ts`.

### ✅ Solución con Nodemon

```bash
npm install -D nodemon

```

Modifica `package.json`:

```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}

```

---

## 🛠️ Implementación de TSC (TypeScript Compiler)

### Compilar archivos

```bash
tsc src/index.ts

```

### Instalar TypeScript

```bash
npm install -D typescript

```

---

## ⚙️ Configuración `tsconfig.json`

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "lib": ["ESNext"],
    "strict": false,
    "sourceMap": true,
    "esModuleInterop": true,
    "declaration": true},
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

```

---

## 🌐 Crear un Servidor con Node.js y Express

### 📦 Instalación de Dependencias

```bash
npm i express
npm i -D @types/express

```

---

## ⚙️ Configuración del servidor (`server.ts`)

```tsx
import express from "express";

const server = express();

server.get("/", (req, res) => res.send("Hola Mundo"));

server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

export default server;

```

---

## 📬 Métodos comunes de respuesta (`res`)

- `res.send()` → Texto o HTML
- `res.json()` → JSON
- `res.sendFile()` → Archivos
- `res.sendStatus()` → Código de estado

ℹ️ Por defecto, el método usado al visitar una URL es **GET**.

---

## 📚 Documentación adicional

- [Modelos](./docs/models.md)

- [Problema con Sequelize: "Model not initialized"](./docs/problemaConSequelize.md)

- [Hacer Peticiones HTTP](./docs/hacerPeticionesHTTP.md)

- [Testing](./docs/testing.md)
-[documentarcion de API](./docs/api.md)

### Importante a la hora de trabajar jest con módulos

El archivo jest.config.js debe cambiar a `jest.config.cjs` y la extendió de los archivos de pruebas debe ser `.test.ts` o `.spec.ts`.

## Instalar Cors

Ejecutamos los siguientes comandos en la terminal:

```bash
npm i cors
npm i -D @types/cors

``` 

Este solo va en el Servidor.

