import express from "express";
import chalk from "chalk";
import swaggerUI from "swagger-ui-express"; // Crea una URL para acceder a la documentación
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
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

//? Permitir conexión CORS
/**
 * Configuración de CORS
 * @param origin
 * origin: es el origen de la solicitud
 * @callback
 * callback: permite o rechazar la solicitud
 */
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if (origin === process.env.FRONTEND_URL) {
			/**
			 * @param null
			 * null: permite la solicitud
			 * @param boolean
			 * boolean: permite o rechaza la solicitud true | false
			 */
			callback(null, true);
		} else {
			callback(new Error("Error de CORS"));
		}
	},
};

server.use(cors(corsOptions));

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// Servir la carpeta public/assets en /assets
server.use(
	"/assets",
	express.static(path.join(process.cwd(), "public/assets"))
);

// Leer datos del body

server.use(express.json()); // Habilita el parsing de JSON en el body de las peticiones

/**
 * Configuración de morgan
 * @see https://www.npmjs.com/package/morgan
 * @param
 * dev: muestra las peticiones en la consola
 * common: muestra las peticiones en la consola
 * short: muestra las peticiones en la consola
 * tiny: muestra las peticiones en la consola
 * combined: muestra las peticiones en la consola
 */
server.use(morgan("dev"));

server.use("/api/products", router);

//Documentación de la API
server.use(
	"/docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);
export default server; // ✅ sigue existiendo el default
export { connectDB };
