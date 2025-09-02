# Testing

## ¿Que es Testing en API's?

Escribir Testing para nuestras API's no en muy diferente que aplicar testing a aplicaciones React.

No porque nuestra API este hecha con TypeScript significa que no vamos añadir a las pruebas. Las pruebas deben estar ahí
y en muchos trabajos tu código debe ir acompañado por una serie de tests.

## Tipo de Testing en node.js y API's

- Unit Testing: Verificar que partes individuales de nuestro código funcione correctamente; tales como crear el servidor, visitar una URL,
debemos revisar que cada pieza funcione como esperamos antes de integrarla con otras piezas.

- Integration Testing:  Una vez que resisamos que algunas piezas de código funcionen por si solas, es momento de revisar cuando dos o más
se unen, tales como visitar una ruta y obtener datos, o enviar una petición post, validar y entonces crear el producto.

## Jest y Supertest

### Jest

- Es uno del los frameworks para aplicar testing más conocidos hoy en día, funciona con typeScript, node.js, React, Angular y Vue.
- La configuración es muy simple, los test corren aparte y no se mezclan con el código existente.

### Supertest

- Jest no da una serie de funciones para probar el código, pero con Supertest podremos realizar peticiones hacia nuestra API y revisar
que el código funcione como esperamos.
  - Con supertest podremos realizar pruebas de integración entre las URL's de nuestra API y el ORM.

## Pasos para usar Jest y Supertest

1. Instalarlo con `npm install -D jest ts-jest @types/jest supertest @types/supertest`
npm install -D jest ts-jest @types/jest supertest @types/supertest

2. Crear un archivo de configuración de Jest con `npx jest config:init`

### Extensiones para Jest

Jest puede leer archivos de 3 formas:

- Archivos con la extensión .test.js
- Archivos con la extensión .test.ts
- Archivos con la extensión .spec.ts
- Archivos en el directorio `__tests__`

### El Supertest

Este se encuentra en el paquete `supertest` y se encarga de realizar las peticiones HTTP hacia nuestra API.

## Documentación: Error de Jest con TypeScript y Supertest

### Proyecto

- Node.js + Express + TypeScript
- Sequelize (Postgres)
- Jest + Supertest

---

### Descripción del error

Al correr los tests con:

```bash
npm test
```

Se presentaba el siguiente error:

```bash
Jest encountered an unexpected token

SyntaxError: Cannot use import statement outside a module
```

Detalle en la ejecución:

```bash
import request from 'supertest';
^^^^^^
SyntaxError: Cannot use import statement outside a module
```

Además, después de configurar TS, aparecía:

```bash
Cannot log after tests are done. Did you forget to wait for something async in your test?
Attempted to log "Executing (default): SELECT 1+1 AS result".
```

Esto indicaba que:

1. Jest no estaba interpretando correctamente los módulos ES (`import/export`) en TypeScript.
2. Sequelize seguía realizando operaciones asíncronas después de que los tests habían finalizado.

---

## Causas

1. **Compilación TS → JS**: Se estaban ejecutando los tests en el directorio `dist` con código compilado que aún tenía `import/export`, y Jest esperaba CommonJS.
2. **Configuración de Jest**: No estaba correctamente integrada con `ts-jest`.
3. **Conexión a DB**: `db.sync()` y `db.authenticate()` se ejecutaban en la inicialización de `server.ts`, generando logs de Sequelize después de que Jest finalizaba el test.

---

## Solución Paso a Paso

### 1. Instalar ts-jest

```bash
npm install --save-dev ts-jest @types/jest
```

### 2. Configurar `jest.config.js`

```js
/** @type {import("jest").Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/__test__/**/*.test.ts'],
};
```

### 3. Cambiar imports de tests a TypeScript

```ts
import request from 'supertest';
import server from '../server';
```

- Guardar los tests en `src/__test__/`.

### 4. Evitar logs de Sequelize durante tests

En `server.ts` o en la función de conexión:

```ts
if (process.env.NODE_ENV === 'test') {
  await db.sync({ force: true, logging: false }); // Logging desactivado en tests
} else {
  await db.sync({ alter: true });
}
```

### 5. Ejecutar tests directamente sobre TypeScript

```bash
npm test
```

- Con `ts-jest`, Jest interpreta TypeScript sin compilar a `dist`.
- No hay conflictos de `import/export`.
- No aparecen logs de DB después de los tests.

---

## Resultado

```bash
PASS  src/__test__/server.test.ts
  Get /api
    √ Should send back a json response (35 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
```

✅ Tests corriendo correctamente
✅ No hay errores de sintaxis ni logs colgados
✅ Compatible con TypeScript y Sequelize

---

## Notas

- Mantener `NODE_ENV=test` al correr tests para desactivar logs de Sequelize.
- Evitar ejecutar tests sobre `dist` compilado; usar siempre `src` con `ts-jest`.
- Para detectar timers o recursos abiertos, usar:

```bash
jest --detectOpenHandles
```

## Limpiar la base de datos

para llamar la función de limpieza: usamos process.argv[2] para pesarle el argumento de limpieza es llamado desde la terminal con:
> implementación de Clyde de Node.js

```bash

```

## Implementamos en coverage

Es una métrica utilizada para medir la cantidad de código fuente que ha sido ejecutado o cubierto por un conjunto de pruebas

En otras palabras, mide que porcentaje del código de un programa ha sido probado. Cuanto mayor sea la cobertura del codigo, mas exsaustivas son la pruebas 
lo que a menudo se considera un indicador positivo de la calidad del software.

### Metricas

< 60% : No es suficiente 

< 80% : Bueno, pero se puede mejorar

> 80% : Muy bueno - Es suficiente y una buena medida 

100% : Excelente y lo ideal - Pero poco probable

Como ejecutar el coverage
En el package.json, agregamos la siguiente configuración
`"test:coverage": "jest -detectOpenHandles --coverage"`

se compone de:
% lines: Porcentaje de lineas cubiertas
% Stmts: Porcentaje de sentencias cubiertas - algunos try catch no cuentan
% Branches: Porcentaje de ramas cubiertas
% Functions: Porcentaje de funciones cubiertas, se se han probado  las validaciones de las funciones

### Probar otras funciones

Forzar pruebas para probar el cache, el mock simular el comportamiento de la base de datos
jest.mock('../db/connectDB')
uso del mock para forzar pruebas y usamos un espía
niego la promesa con .mockResolvedValueOnce()
