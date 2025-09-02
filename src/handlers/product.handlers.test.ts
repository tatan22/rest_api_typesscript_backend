import request from "supertest";
import server from "../server";
import Product from "../models/Product.model";
import { error } from "console";

describe("POST /api/products", () => {
	//? Probar la validación de los datos
	it("Should display validation errors", async () => {
		const response = await request(server).post("/api/products").send({
			// .send  lo enviamos vació para simular que no enviamos ningún dato
		});
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(4); // type, msg, path, location

		// Contraparte
		expect(response.status).not.toEqual(404);
		expect(response.body.errors).not.toHaveLength(2);
	});
	// Que el precio no sea menor a 0
	it("Should display that the price is greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Producto 1",
			price: -100,
		});
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1); // type, msg, path, location

		// Contraparte
		expect(response.status).not.toEqual(404);
		expect(response.body.errors).not.toHaveLength(2);
	});
	//? Si le paso un string en el precio
	it("Should display that the price is greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Producto 1",
			price: "string",
		});
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(2); // type, msg, path, location

		// Contraparte
		expect(response.status).not.toEqual(404);
		expect(response.body.errors).not.toHaveLength(3);
	});

	it("Should create a product", async () => {
		const response = await request(server).post("/api/products").send({
			// .send es la información que vamos a enviar
			name: "Producto 1",
			price: 100,
		});

		// expect(response.status).toBe(201)
		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty("message", "Producto creado");

		// Contraparte
		expect(response.status).not.toBe(400);
		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("error");
	});
});

describe("GEt /api/products", () => {
	it("Should check if api/products url exi", async () => {
		const response = await request(server).get("/api/products");
		expect(response.status).not.toBe(404);
	});

	it("Should a JSON response with products", async () => {
		const response = await request(server).get("/api/products");

		expect(response.status).toEqual(200);
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.body).toHaveProperty("data");
		// expect(response.body.data).toHaveLength(1);
		// Contraparte
		expect(response.status).not.toBe(404);
		expect(response.headers["content-type"]).not.toMatch(/[]/);
		expect(response.body).not.toHaveProperty("errors");
	});

	describe("GET /api/products/:id", () => {
		it("Should return a 404 response for a non-existent product", async () => {
			const productoID = 2000;
			const response = await request(server).get(`/api/products/${productoID}`);
			expect(response.status).toEqual(404);
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toContain("Producto no encontrado");
		});
		it("Should checK a valid ID in the URl", async () => {
			const response = await request(server).get("/api/products/not-valid-url");
			expect(response.status).toEqual(400);
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.body).toHaveProperty("errors");
			expect(response.body.errors).toHaveLength(1);
			expect(response.body.errors[0].msg).toBe("El id debe ser numérico");
		});
		it("Should a JSON response for a single product", async () => {
			const response = await request(server).get("/api/products/1");
			expect(response.status).toEqual(200);
			expect(response.body).toHaveProperty("data");
		});
	});
});

describe("PUT /api/products/:id", () => {
	it("Should checK a valid ID in the URl", async () => {
		const response = await request(server)
			.put("/api/products/not-valid-url")
			.send({
				name: "Producto 1",
				availability: false,
				price: 100,
			});
		expect(response.status).toEqual(400);
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("El id debe ser numérico");
	});

	it("Should display validation errors message when updating a product", async () => {
		const response = await request(server).put("/api/products/1").send({});
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy(); // no importa lo que pongamos en el body, siempre va a ser true
		expect(response.body.errors).toHaveLength(4);

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty("data");
	});
	it("Should validate that the price is greater than 0 ", async () => {
		const response = await request(server).put("/api/products/1").send({
			name: "Producto 1",
			availability: false,
			price: -100,
		});
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy(); // no importa lo que pongamos en el body, siempre va a ser true
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("El precio no es valido");

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty("data");
	});

	it("Should return a 404 response for a non-existent product", async () => {
		const productoID = 2000;
		const response = await request(server)
			.put(`/api/products/${productoID}`)
			.send({
				name: "Producto 1",
				availability: false,
				price: 300,
			});
		expect(response.status).toEqual(404);
		expect(response.body.error).toBe("Producto no encontrado");

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty("data");
	});
	it("Should update an existing product with valid data", async () => {
		const response = await request(server).put(`/api/products/1`).send({
			name: "Producto 1",
			availability: false,
			price: 300,
		});
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty("errores");
	});
});

describe("Path /api/products/:id", () => {
	it("Should return a 404 response for a non-existent product", async () => {
		const response = await request(server).patch(`/api/products/1`);
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data.availability).toBe(true);
		expect(response.status).not.toEqual(400);
		expect(response.status).not.toEqual(404);
	});

	it("Should update the product availability", async () => {
		const response = await request(server).patch(`/api/products/not-valid-url`);
		expect(response.status).toEqual(400);
	});
});

describe("DELETE /api/products/:id", () => {
	it("should check a valid ID ", async () => {
		const response = await request(server).delete(
			"/api/products/not-valid-url"
		);
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors[0].msg).toBe("El id debe ser numérico");
	});

	it("should return a 404 response for a non-existent product", async () => {
		const productoID = 2000;
		const response = await request(server).delete(
			`/api/products/${productoID}`
		);
		expect(response.status).toEqual(404);
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toEqual(200);
	});

	it("should return a 404 response for a non-existent product", async () => {
		const productoID = 2000;
		const response = await request(server).delete(
			`/api/products/${productoID}`
		);
		expect(response.status).toEqual(404);
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toEqual(200);
	});

	it("should delete a product", async () => {
		const response = await request(server).delete(`/api/products/1`);
		expect(response.status).toBe(200);
		expect(response.body.data).not.toEqual(400);
		expect(response.status).not.toEqual(404);
	});
});
