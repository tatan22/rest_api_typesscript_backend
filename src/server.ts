import express from "express";
import chalk from "chalk";
import swaggerUI from "swagger-ui-express"; // Crea una URL para acceder a la documentación
import router from "./router";
import db from "../src/config/db";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import path from "path";

const server = express();

// Conectar a la DB solo una vez
let isConnected = false;
async function connectDB() {
	if (isConnected) return;
	try {
		await db.authenticate();
		await db.sync({ alter: true });
		console.log(chalk.bgGreen.white.bold("Conectado a la DB"));
		isConnected = true;
	} catch (error) {
		console.error(chalk.bgRed.white.bold("Error al conectar a la DB"), error);
	}
}

if (process.env.NODE_ENV !== "test") {
	connectDB();
}

// Servir la carpeta public/assets en /assets
server.use(
	"/assets",
	express.static(path.join(process.cwd(), "public/assets"))
);

// Leer datos del body

server.use(express.json()); // Habilita el parsing de JSON en el body de las peticiones

server.use("/api/products", router);

//Documentación de la API
server.use(
	"/docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);
export default server; // ✅ sigue existiendo el default
export { connectDB };
