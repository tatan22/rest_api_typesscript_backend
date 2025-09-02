# 🔍 Hacer Peticiones HTTP

Puedes utilizar herramientas como **Postman** o **Thunder Client** para probar los siguientes métodos:

- `GET` → Obtener información 📄
- `POST` → Crear información ➕
- `PUT` → Actualizar información 🔁
- `PATCH` → Actualización parcial ⚙️
  - La diferencia entre `PUT` y `PATCH` es que `PUT` reemplaza el recurso completo y `PATCH` solo actualiza partes del recurso.
- `DELETE` → Eliminar información ❌

🚫 El navegador **solo soporta GET y POST** de forma nativa. Para otros métodos, se debe usar `fetch` o `axios`.

---

## Cuando Utilizar PUT o PATCH

- **PUT:** Este método se utiliza para actualizar o remplazar completamente un recurso existente en la base de datos.

  - Cuando hacer una solicitud PUT, estás diciendo al servidor que tome la información proporcionada y la utilice para reemplazar
completamente el recurso en la ubicación específica.
  - Por ejemplo, si tiene un objeto JSON que represente un producto y haces la solicitud PUT al servidor con ese objeto, el servidor
  reemplazara completamente los datos del producto existente con los datos proporcionados en la solicitud.

- **PATCH:** Este método se utiliza para actualizar parcialmente un recurso existente en la base de datos.

  - El método PATCH se utiliza para realizar modificaciones parciales de un recurso existente en un servidor web.

  - En lugar  de reemplazarlo completamente el recurso, como lo hace PUT, PATCH permite realizar cambios específicos en los datos del recurso  sin afectar el resto de la información.

  - Por ejemplo, si tienes un objeto JSON que representa un producto y haces una solicitud PATCH al servidor con un pequeña parte de los datos actualizados( por ejemplo, cambiar solo disponibilidad),el servidor aplicara esos cambios sin afectar otros detalles del producto existente.

---

## Formas de pasar el producto a la base de datos y obtener información

- Esta seria la forma de hacerlo con Sequelize
  - Forma creando una instancia del modelo y luego guardarla en la base de datos

        ``` ts
        const product = new Product(req.body);
        const savedProduct = await product.save();
        ```
  - Forma sin crear una instancia del modelo y guardar a su vez en la base de datos

        ``` ts
        const product = await Product.create(req.body); 
        ```

## Validación de la información de Datos

El ORM se encarga de evitar inyección SQL y otros ataques.
Pero nos debemos de validar los datos antes de guardarlos en la base de datos y no ingresen datos vacíos o inadecuados.

- Esto podemos hacerlo con `express-validator`
- Lo instalaremos con `npm i express-validator`

Esta librería puede ser utilizado tanto en el router, el handlers, el los middlewares o en el controlador.

### Como implementarlo desde el handlers

importamos de express-validator las siguientes funciones:

- check: para validar los datos
- validationResult: Nos entrega los resultados de la validación

### Como implementarlo desde el router

Como no es una función asíncrona no podemos usar el await con check. Implementamos body.
Como conclusión check con funciones asíncronas y body con funciones sincronías.

### ¿Qué es un middleware en Node.js?

- En Node.js el middleware se refiere a un tipo de software intermedio que se utiliza para procesar las solicitudes HTTP
antes que lleguen a una aplicación web y antes de ser manejadas por la función de enrutamiento principal.

- Los middlewares son funciones que se ejecutan ene el medio del flujo de solicitud y respuesta del una aplicación web y pueden realizar
diversas tareas, como autenticación, validación de datos, registro de solicitudes, compresión de la respuesta entre otras.

- Son esenciales para la creación de aplicaciones web robustas y flexibles. Cada solicitud HTTP pasa a través de una serie de middlewares antes
de llegar a la función de controlador que maneja la solicitud final.

> siempre que se trabajen con middleware se debe contar con el req y el res.
> Con el next podemos pasar al siguiente middleware o a la controlador

**Nota:** Las palabras claves para ver al diferencia entre put y patch son `replace` y `actualizar`.

## método Delete

> Como recomendación en mejor usar el borrado lógico.
