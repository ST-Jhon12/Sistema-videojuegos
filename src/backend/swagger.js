import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { 
        title: "API REST con Express, Prisma y PostgreSQL", 
        version: "1.0.0",
        description:"Documentacion de API REST con Express, Prisma y PostgreSQL",
        contact:{
            email:"jhonptt84@gmail.com.com"
        }
    },
    servers: [{ 
        url: "http://localhost:3000",
        description:"Servidor de Desarrollo" 
    }],
  },
  apis: ["./routes/*.js"],
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);