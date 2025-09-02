# Modelos

## ¿Que son los modelos?

Los modelos son los objetos que representan las entidades de la base de datos y son los que se usan para interactuar con la base de datos.

- Los modelos siempre son sincronizados con la base de datos.
- Al trabajar con Sequelize, implemetamos decoradores. Se usara la dependencia sequelize-typescript.
- Estos decoradores nos permiten crear tablas y relaciones con la base de datos.
- Al importa de la libreria sequelize-typescript.
  - Table
  - Column
  - Model
  - DataType
  - Default
  - ForeignKey

Con Table se establece el nombre de la tabla.

- tableName: "products": // Establecemos el nombre de la tabla

Con Model se establece la clase que hereda de Model.

- @Column: // aqui se define el tipo de dato
  - type: DataType.STRING(100) // DataType. le asignamos el tipo de dato que queremos en la base de datos
  - En sequelize no contamos con VARCHAR, solo con STRING.
  - Tambien la estencion de las columnas

### ¿Cómo pasar el Modelo a la base de datos?

Para ello tenemos don formar:

- Una sería directamente desde el archivo del modelo.
- La otra forma sería directamente desde la instancia de la base de datos.
- En la nueva instancia de la base de datos adicionaremos:
  - Primero importamos `fileUrlToPath` y `dirname`.
  - `models: [__dirname + "La ruta del archivo del modelo/**/*.{ts,js}"]`
  - Una vez implementado estos pasos, nos lanza un error, el cual nos indica que no puede convertir un `undefined` o `null` a un objeto.
  - Esto se soluciona en el archivo `tsconfig.json`:

    ```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    ```

  - El paso que falta es sincronizar el modelo con la base de datos. Para eso necesitas llamar a:

    ```ts
    await db.sync({ force: true }) // o alter: true para no borrar. Esto debe ir en el archivo donde inicializas la conexión (db.ts)
    ```

## 🛠️ Problema y Solución: Tablas que no se creaban en PostgreSQL con Sequelize

### 📌 Descripción del Problema

Durante el desarrollo de una aplicación con Node.js, Sequelize y PostgreSQL, se presentó el siguiente inconveniente:

La tabla definida en el modelo Product.model.ts no se creaba automáticamente en la base de datos, a pesar de que se usaba `sequelize.sync({ alter: true })`.

### 🔍 Análisis del Problema

Al iniciar la app con el siguiente script:

  ```bash
  "dev": "nodemon src/index.ts --watch src --ext ts --exec tsx --ignore node_modules"
  ```

La app no mostraba errores visibles en consola, pero:

- No se creaba la tabla en PostgreSQL.
- No se ejecutaban algunos console.log() esperados.
- Los modelos no parecían estar siendo registrados por Sequelize.
- Sequelize no arrojaba error explícito al no encontrar los modelos.

__⚠️ Causa del Problema
Uno de los errores principales fue no definir correctamente la ruta del modelo al inicializar Sequelize.__

Este fragmento estaba incorrecto o mal armado:

  ```ts
  models: [path.join(__dirname + "../models/Product.model.ts")]
  ```

Esto hacía que Sequelize no pudiera encontrar el archivo, por lo tanto no cargaba ningún modelo y, en consecuencia, no creaba ninguna tabla.

### ✅ Solución Aplicada

Instalación de herramientas necesarias:

  ```bash
  npm install --save-dev nodemon tsx
  ```

Script de desarrollo actualizado:

  ```json
    "dev": "nodemon src/index.ts --watch src --ext ts --exec tsx --ignore node_modules"
  ```

Ruta correcta del modelo en Sequelize:

  ```ts
  models: [path.join(__dirname, "../models/Product.model.ts")]
  ```

#### 📌 ¿Qué hace esta línea?

`__dirname:` Es el directorio donde se encuentra el archivo actual (en este caso, el archivo de configuración de Sequelize).

`path.join(__dirname, "../models/Product.model.ts")`: Construye una ruta absoluta hacia el archivo Product.model.ts desde la ubicación actual.

🔎 Gracias a esto, Sequelize puede importar y registrar correctamente el modelo al inicializarse, lo que permite ejecutar sequelize.sync() y crear las tablas en la base de datos.

#### Verificación en consola

Una vez corregida la ruta, Sequelize mostró mensajes como:

```sql
Executing (default): SELECT table_name FROM information_schema.tables WHERE ...
Executing (default): CREATE TABLE IF NOT EXISTS "products" ...
```

> **Nota:* Se adicionan tress columnas mas a nuestra base de datos; que son `id`, `created_at` y `updated_at`

- `created_at`: Fecha y hora de creación de la fila.
- `updated_at`: Fecha y hora de la ultima actualizacion de la fila.

- Tambien me da una alvertencia: Me indica que no soporte el FLOAT con decimales.

#### 📈 Resultado Final

Tabla products creada en PostgreSQL correctamente.

`console.log("__dirname")` se mostraba como se esperaba.

Sequelize reconoció el modelo correctamente.

Ambiente de desarrollo funcional con Hot Reload y sincronización activa.

## 🧠 Lecciones Aprendidas

✅ Siempre verifica que las rutas sean absolutas y correctas al usar models en Sequelize.

✅ Usa __dirname y path.join() correctamente en ESModules.

✅ Sequelize no lanza error si no encuentra modelos, solo no crea las tablas, por eso hay que verificar manualmente.

✅ nodemon y tsx deben estar bien configurados para desarrollo con TypeScript.

### Al ser un proyecto pequeño usaremos Handler para manejar rutas

Cramos el directorio `src/handlers` y creamos el archivo `product.handlers.ts` para manejar rutas y controladores de productos.

### Agregando productos a la base de datos

Vamos a trabajas con nuestor endpoint para agregar productos a la base de datos. En el momento no podemos trabajas con GEts, pero podemos crear un POST para agregar productos.

- Obtener produtos **GET* `/products`
- Obtener un producto **GET* `/products/:id`
- Agregar un producto **POST* `/products`. Con este vamos a crear un producto en la base de datos.

El metodo `use` de server se va a encargar de manejar las rutas y devolver el request y el response.

## Error: Respuesta antigua en servidor Node.js

### Descripción

Al acceder a `http://localhost:3000/` se obtenía una respuesta vieja, incluso después de modificar el código.

### Causa

El servidor estaba sirviendo una versión anterior porque no se había reiniciado tras los cambios.

### Solución

Reiniciar el servidor después de modificar el código:

  ```bash
  npm run dev
  ```

o, si es producción:

```bash
node index.js
```

### Explicación de la modificacion de script de desarrollo

Mata cualquier proceso en el puerto 3000 y luego inicia el servidor con nodemon

```json
"dev": "kill-port 3000 && nodemon src/index.ts --watch src --ext ts --exec tsx --ignore node_modules"
```

1. __`kill-port 3000`__  
  Antes de iniciar el servidor, elimina cualquier proceso que esté ocupando el puerto `3000`.  
  Esto evita errores como `EADDRINUSE: address already in use`.

2. __`nodemon src/index.ts --watch src --ext ts --exec tsx --ignore node_modules`__  

- __`--watch src`__: Observa cambios en la carpeta `src`.
- __`--ext ts`__: Detecta cambios en archivos `.ts`.
- __`--exec tsx`__: Usa `tsx` para ejecutar TypeScript sin compilar manualmente.
- __`--ignore node_modules`__: Evita reinicios innecesarios al cambiar dependencias.

### Leer el cuerpo de la solicitud POST y guardarlo en la base de datos

El cuerpo de la solicitud POST se puede leer con `req.body` y se puede guardar  en la base importando
el metodo `.save`.

- Debemos configurar nuestro tsconfig.json

```json
    "target": "ESNext", // versión de JS que queremos compilar
    "moduleResolution": "nodenext", // Como queremos que se resuelvan los modulos
    "module": "nodenext", // Forma moderna de manejar modulos
```
