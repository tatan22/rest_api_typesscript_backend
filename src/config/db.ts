import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // Para recrear __dirname en ESModules
// import path, { dirname } from "path"; // Para obtener el directorio padre //* Solo si se trabaja con CommonJS
import Product from "../models/Product.model.js";

dotenv.config();

// // ✅ Recrear __dirname para ESModules //* Solo si se trabaja con CommonJS
// const __filename = fileURLToPath(import.meta.url);// Obtiene la URL del archivo actual //* Solo si se trabaja con CommonJS
// const __dirname = dirname(__filename);// Obtiene la ruta del directorio actual //* Solo si se trabaja con CommonJS

const db = new Sequelize(process.env.VITE_EXTERNA_DATABASE_URL!, {
	models: [Product], // Se pueden definir multiples directorios
	logging: false,
	dialectOptions: {
		ssl: {
			require: true, // Esto es importante para asegurarse de que SSL se utilice correctamente
			rejectUnauthorized: false, // Puedes intentar establecer esto en false si ewl servidor tiene un certificado autofirmado
		},
	},

	// Configuración de tiempo de espera
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export default db;
