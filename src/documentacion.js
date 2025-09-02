/**
 *!# Rest API's con Express y Typescipt
 
 Un ejemplo de como crear un servidor con Express y Typescript
 Se creo en la carpeta `src`
 Se creo el archivo 
 - `server.ts`
 - `index.ts`
 - `router.ts`
 En server se implemto en metodo use el cual engloba todo el router
 Este recibe una instancia del router de express
 su sintaxis es la siguiente:
 ```js
 server.use(router);
 ```
 # ¿Qué son los ORM 'Object Relational Mapping' en Node.js?
 Ventajas, consideraciones y más.
 ¿Qué es ?
 Un ORM (Object Relational Mapping) simplica la comunicacion entre una base de datos y el código de tu app.

 En lugar de escribir consultas de SQL escribes funciones que son bastante similar a el lenguaje de tu base de datos.
 - Al fina este legunga se puede pasa a ser código JS o TS.

*?## Ventajas de un ORM
 - Abstraccion: Esto significa que puedes interactuar con la base de datos usando objetos, clases y médotodos en lugare de 
 escribir consultas SQL.
 -Portabilidad: Puedes cambiar de un sistema de gestión de base de datos a otro sin tener que sobreescibir el código.
    - El ORM que vamos a implentar en este proyecto es soporta: mysql, PostgreSQL, SQL Server y Oracle.
-Productividad: El ORM se encarga de tarea repetitivas como la feneracion de consultas SQL, lo que permite enfocarte 
en la logica de negocio o app.

*? ## Consideraciones de un ORM
- Debe estar desarrollado de forma activa.
- Un ORM asegura la entrada de la información pero siempre debes validarlo.
- Cambiar de ORM's puedes no ser tan simple, elige con cuidado antes de iniciar tu proyecto.
    - Cada ORM implemeta sus propios metodos y sintaxis.
** ### Que ORM's podemos usar en Node.js
    -Mongoose // El más popular
    -Sequelize
    -Prisma
    -TypeORM
Para este proyecto estaremos usando Sequelize
    - Sequelize soporta TypeScript y diferentes bases de datos
        -Oracle
        -MySQL
        -PostgreSQL
        -SQLite
        -SQL Server

    - Se puede usar con Express

*? Creando una base de datos en Reder.
Analizaremos varios servidores de bases de datos y crearemos una base de datos en Render.
-ElephantSQL\
-Filess.io
-Render ( La que usaremos).
Render es gratis para proyectos personales, me permite usar MySQL, PostgreSQL, SQL Server y Oracle.
Instalacion de sequelize:

```bash
npm i sequelize
```
Instalacion de dependencias para la Base de datos:
```bash 
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database

```
** Nota;** `save:` se utiliza para guardar la dependencia en el package.json como dependencia de desarrollo.

Para este proyecto usaremos PostgreSQL.
- Creamo el diretorio de config y dentro creamos el archivo `db.ts`
-Instanciamos la bd:
const db = new Sequelize(); Tiene diferentes metodos para conectarse a la bd.
Importante crear un .env con las credenciales de la bd.
- mi conecion sera por 


# 🔄 Diferencias entre CommonJS y ES Modules

| Característica        | CommonJS                       | ES Modules (ESM)                 |
|-----------------------|--------------------------------|----------------------------------|
| Extensión de archivos | No se necesita `.js`           | Necesita `.js` en imports        |
| Imports               | `require()` / `module.exports` | `import` / `export`              |
| Soporte en Node.js    | Por defecto                    | Necesita `"type": "module"`      |
| Compilación (TS)      | `"module": "CommonJS"`         | `"module": "ESNext"`             |

---

## 🛠️ ¿Cómo usar cada uno?

### ✅ CommonJS (el clásico):
```jsonc
// tsconfig.json
"module": "CommonJS"
// package.json → NO pongas "type": "module"
```
```ts
import express from 'express';
import router from './router'; // sin .js
```

### ✅ ES Modules (moderno):
```jsonc
// tsconfig.json
"module": "ESNext"
// package.json
"type": "module"
```
```ts
import express from 'express';
import router from './router.js'; // con .js obligatorio
```

---

## 📌 Recomendación
- Usa **CommonJS** para proyectos educativos o si no quieres complicarte.
- Usa **ES Modules** si trabajas con herramientas modernas o librerías que lo requieran.


*? Corregir el error de SSL
Agregar al final de la url la palabra `?ssl=true`
tambien en vez de as string le puedo poner ! 
la otra opcion:
 la url,{
 
    ssl: {
        require: false
    }}


## Configuracion de variables de entorno
instalacion de la dependencia dotenv
```bash
npm i dotenv
```
Se crea el archivo .env y se agregan las variables de entorno
Nota; a diferencia de Vite la variable de entorno no debe iniciarse con `VITE_`
con proceso de env tengo acceso a las variables de entorno en mi servidor

```js
import dotenv from 'dotenv';
dotenv.config();

## importacia del .gitignore
En el archivo .gitignore le incdicamos que directorio o archivo no queremos subir a github.
En este caso el archivo .env
```
node_modules/
dist/
.env
```
Las variable4s de entorno podian ir en un panel en el hosting que nosotros usamos.

## Como conectarnos a un cliente como dbeaver y tableplus.
Estaremos usando tableplus que es una herramienta para trabajar con bases de datos.
- Tomamos el host: esta depsues del @ de la url y empieza con dpg
- El puerto: lo tomamos despues del :
- La base de datos: lo tomamos despues del /

## Personalizacion de la terminal con Colores para detectar errores.
Instlaremos una dependencia llamada color.

```bash
npm i colors
```
npm install --save-dev @types/colors
En caso de usar Y si estás usando `CommonJS` (require), sería:

```js
const colors = require('colors');
```
Importante como estoy trabajando con type modules, la recomendacion seria usar chalk
```bash
npm i chalk -D        
```
sintaxis:
```js
import chalk from 'chalk';
console.log(chalk.bgRed.white.bold("Error al conectar a la DB  implemtando chalk"));
```
## Creacion del modelo de Productos.
Los modelos son las clases que representan las tablas de la base de datos. son los que se usan para interactuar con la base de datos.
Los modelos estan sincronisados uno a uno con las columnas de la base de datos.
- Sequelize lo hace de forma secilla ya que sincroniza de forma autmatica las columnas con las propiedades de la clase. Esto lo hace a traves
del metodo sync().
### Instalación de la dependencia de soporte de TS para Sequelize:

```bash
npm i sequelize-typescript
```
Se implementaran decoradores para la creacion de tablas y relaciones con la base de datos.
Un Decorador en pocas palabras es una funcion que se aplica a una clase para modificar su comportamiento.
se idefica con el simbolo @ al inicio de la clase.
- Paso siguiente modificar la importacion de sequelize
```js   
import { Sequelize } from "sequelize-typescript";
```
Creamo en nuestro diretorio src el directorio de models.
- Los modelos usualmente se escriben con capital en el nombre y con la palabra Model al final.
    -ProductModel.ts
    -Product.model.ts (Este es el que implemtaremos en el curso)
    -Product.ts
Importamos los decoradores y la libreria de sequelize.
```js
import { Model, Column, Table, DataType, ForeignKey, Default } from "sequelize-typescript";
```
---
### Ejemplo de un modelo de producto
```ts
@Table({
    tableName: "products", // Establecemos el nombre de la tabla
})
class Product extends Model{ // Establecemos la clase que hereda de Model e implemetar todos sus metodos
   

}
En el modelo van todos los atributos de la base de datos
- Ejemplo:
    -id: __Normalmente este es asignado automaticamente por la base de datos__.
    -name
    -price
    -description
```
se creo el siguiente modelo de producto.
class Product extends Model{ // Establecemos la clase que hereda de Model e implemetar todos sus metodos
   @Column({ // aqui se define el tipo de dato
       type: DataType.STRING(100) // DataType. le asignamos el tipo de dato que queremos en la base de datos
   })
   name: string

   @Column({
       type: DataType.FLOAT(6, 2) // Ideal para precios, el 10 catida de digitos de la parte enterera y el 2 la parte decimal
   })
   price: number

   @Column({
       type: DataType.BOOLEAN
   })
   avalability: boolean
}
     
Existen dos formas de implentar el modelo de productos para que se agregen todas las columnas.
una seria implementarla en la conexion a nuestra base de datos.
 Tenemos un erro,debemos decirle a typeScript  quie haga el soporte de los decoradores.
 Lo primero que debemos de hacer para trabaja con decoradore es ir al archivo tsconfig.json.
 - Agregamos la siguiente configuracion:
```json
 // adicionamos la siguiente configuracion
 "compilerOptions": {
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true
 } 
}
---
✅ Solución: recrear __dirname en ES Modules
En tu archivo donde estás usando __dirname, por ejemplo en db.ts, reemplaza:

ts
Copiar
Editar
__dirname
por este bloque:

ts
Copiar
Editar
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Estas dos líneas recrean __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
Y luego ya puedes usar __dirname normalmente.
 */
