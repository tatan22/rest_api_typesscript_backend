import server from "./server";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config({ debug: true }); // debug: true nos permite ver las variables de entorno

const port = process.env.VITE_PORT || 4000;

// Podemos mandar a llamar la instancia del servidor
server.listen(port, () =>
	console.log(chalk.bgMagenta(`Servidor corriendo en el puerto ${port}`))
); // .listen es un método que nos permite escuchar peticiones
