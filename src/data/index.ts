// Limpia nuestra base de datos después de las pruebas
import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
    try {
        await db.sync({ force: true }); // Borra la base de datos
        console.log("Base de datos limpiada");
        exit(); // Éxito (0)
    } catch (error) {
        console.log(error);
        exit(1); // Error
    }
}

if (process.argv[2] === "--clear") {
    clearDB();
}