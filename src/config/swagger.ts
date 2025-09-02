import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.2", // Da soporte a OpenAPI 3.0
		tags: [
			{ name: "Products", description: "API operations related tio products" },
		],
		info: {
			title: "REST API Node.js / Express / TypeScript",
			version: "1.0.0",
			description: "API Docs for Products",
		},
	},
	apis: ["./src/router.ts"], // los endpoints a documentar, puede ser un array si son diferentes rutas
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
	customCss: `
		.swagger-ui .topbar a {
			max-width: 150px;
			content: url('/assets/api.png');
		}
    .swagger-ui .topbar{
      background-color: yellow;
    }
  `,
	customSiteTitle: "REST API Node.js / CarvinStore",
};
export default swaggerSpec;

export { swaggerUiOptions };
