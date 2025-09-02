# Documentación de APIS  

La documentación de apis es contenido técnico que describe una API a detalle.

Incluye instrucciones sobre como utilizar una API de forma correcta como son endpoints soportados, tipos de peticiones, que
valores soporta y mas.

Una vez que una API es publicada. la documentación se asegura que otras herramientas (internas o externas sepan que se puede
 hacer y como utilizarla )

## ¿Porqué documentar una API's?

La principal razón de documentar una API es para que sea utilizada de forma correcta.

Otra razón es para tener mayor adopción, una buena documentación hará que sea claro que funcionalidad hay disponible
y los usuarios podrán sacar máximo provecho.

Reduce costos de soporte y mantenimiento.

## Instalación de Swagger

Instalamos las siguientes dependencias:

Podemo implementar un formato Yarn o NPM

```bash
npm i swagger-jsdoc // Para generar la documentación en Yarn
npm i swagger-ui-express // Tener una URL para acceder a la documentación
ó 
npm i -D @types/swagger-ui-express swagger-jsdoc

```

instalamos los types 

```bash
npm i @types/swagger-jsdoc
npm i @types/swagger-ui-express
```

creamos en el directorio de configuración un archivo llamado swagger.js

Podemos acceder a la documentación desde la URL http://localhost:3000/docs

## Documentación de Productos, Atributos de Productos

Implementaremos un schema de productos.

En el router creamos un comentario de multiple lineas para lo atributos del schema de productos.

## Cambiar logo de la documentación y personalizarla

En swagger.ts podemos personalizar el logo de la documentación.

`const swaggerUIOptions = {}`
