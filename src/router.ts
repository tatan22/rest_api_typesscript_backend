// importamos una instancia del router de express
import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateAvailability,
	updateProduct,
} from "./handlers/product.handlers.js"; // Importamos el handler para crear un producto
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index.js";

const router = Router(); // Instancia del router
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: Product 1
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 10.99
 *         availability:
 *           type: boolean
 *           description: The availability of the product
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Product 1
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 10.99
 *               availability:
 *                 type: boolean
 *                 description: The availability of the product
 *                 example: true
*     responses:
*         201:
*           description: Product created successfully
*         400:
*           description: Bad request

 *
 */
router.post(
	"/",
	body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
	body("price")
		.isNumeric()
		.withMessage("Valor del precio no es de tipo numérico")
		.notEmpty()
		.withMessage("El precio del producto es obligatorio")
		.custom((value) => value > 0)
		.withMessage("El precio no es valido"),
	handleInputErrors,
	createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.get(
	"/:id",
	// Validaciones
	// - Parámetros
	param("id").isInt().withMessage("El id debe ser numérico"),
	// middleware
	handleInputErrors,
	getProductById
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     description: Update a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Product 1
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 10.99
 *               availability:
 *                 type: boolean
 *                 description: The availability of the product
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid ID or Invalid input data
 *       404:
 *         description: Product not found
 */
router.put(
	"/:id",
	param("id").isInt().withMessage("El id debe ser numérico"),
	body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
	body("price")
		.isNumeric()
		.withMessage("Valor del precio no es de tipo numeric")
		.notEmpty()
		.withMessage("El precio del producto es obligatorio")
		.custom((value) => value > 0)
		.withMessage("El precio no es valido"),

	handleInputErrors,

	updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update the availability
 *     tags: [Products]
 *     description: Update the availability of a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid ID or Invalid input data
 *       404:
 *         description: Product not found
 */

router.patch(
	"/:id",
	param("id").isInt().withMessage("El id debe ser numérico"),
	handleInputErrors,
	updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     description: Return a confirmation message
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: "Product deleted successfully"
 *               example: "Product deleted successfully"
 *       400:
 *         description: Bad request - Invalid ID
 *       404:
 *         description: Product not found
 */
router.delete(
	"/:id",
	param("id").isInt().withMessage("El id debe ser numérico"),
	handleInputErrors,
	deleteProduct
);

export default router;
