import { Table, Column, Model, DataType, Default } from "sequelize-typescript"; // Podemos importar nuestro decoradores de la librería

@Table({
	tableName: "products", // Establecemos el nombre de la tabla
	timestamps: true,
})
class Product extends Model<Product> {
	// Establecemos la clase que hereda de Model e implementar todos sus métodos
	// @Default('Perro sencillo')
	@Column({
		// aquí se define el tipo de dato

		type: DataType.STRING(100), // DataType. le asignamos el tipo de dato que queremos en la base de datos
		//*Nota: En sequelize no contamos con VARCHAR, solo con STRING */
		// También la extensión de las columnas
	})
	declare name: string;

	@Column({
		type: DataType.DECIMAL(6, 2), // Ideal para precios, el 10 cantidad de dígitos de la parte entera y el 2 la parte decimal
	})
	declare price: number;

	@Default(true)
	@Column({
		type: DataType.BOOLEAN,
	})
	declare availability: boolean;
}

export default Product;
