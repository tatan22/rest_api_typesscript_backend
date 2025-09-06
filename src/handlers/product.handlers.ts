import e, { Request, Response } from "express";
import Product from "../models/Product.model.js";

export const getProducts = async (req: Request, res: Response) => {
	// en express por defecto se le pasa req y res
	try {
		const products = await Product.findAll({
			// order: [
			//     ["name", "ASC"]
			// ],
			// attributes: {exclude :['id', 'availability']}
			// limit: 2
		});

		res.status(200).json({ data: products });

		// res.json({ data: products });
	} catch (error) {
		res.status(500).json({ message: "Error al obtener los productos" });
	} finally {
		console.log("Proceso finalizado");
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		// const product = await Product.findByPk(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		res.json({ data: product });
	} catch (error) {
		console.log(`Se presento un error al buscar el producto: ${error}`);
		res.status(500).json({ message: "Error al obtener el producto" });
	} finally {
		console.log("Proceso finalizado");
	}
};

export const createProduct = async (req: Request, res: Response) => {
	try {
		// const product = new Product(req.body);
		// await product.save();
		const product = await Product.create(req.body); // Aquí creamos el producto
		res.status(201).json({ data: product });
	} catch (error) {
		console.log(`Se presento un error al crear: ${error}`);
	} finally {
		console.log("Proceso finalizado");
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		console.log(product);

		if (!product) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}

		// await product.update(req.body); //? Protege la base de datos del put

		// //? Con esto se actualiza el producto sin Update
		product.name = req.body.name; // si no le pasamos el name no lo va a actualizar deja el mismo
		product.price = req.body.price;
		product.availability = req.body.availability;
		console.log(product);

		//? Shortcut
		// Object.keys(req.body).forEach((key) => {product[key] = req.body[key];})

		await product.save();
		res.json({ data: product });
	} catch (error) {
		console.log(`Se presento un error al actualizar: ${error}`);
		return res.status(500).json({ message: "Error al actualizar" });
	} finally {
		console.log("Proceso finalizado");
	}
};

export const updateAvailability = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		product.availability = !product.dataValues.availability; // Alterna el estado del producto
		await product.save();

		res.json({ data: product });
	} catch (error) {
		console.log(`Se presento un error al actualizar: ${error}`);
		return res.status(500).json({ message: "Error al actualizar" });
	} finally {
		console.log("Proceso finalizado");
	}
};
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		await product.destroy();
		return res.json({ message: "Producto eliminado", data: product });
	} catch (error) {
		console.log(`Se presento un error al actualizar: ${error}`);
		return res.status(500).json({ message: "Error al actualizar" });
	} finally {
		console.log("Proceso finalizado");
	}
};
