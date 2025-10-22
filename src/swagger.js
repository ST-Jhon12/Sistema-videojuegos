import swaggerJsdoc from 'swagger-jsdoc'; 
const swaggerOptions = { definition: { openapi: '3.0.0', info: { title: 'Mi API REST', version: '1.0.0' }, servers: [{ url:
'http://localhost:3000' }] }, apis: ['./routes/*.js'] }; export const swaggerSpec = swaggerJsdoc(swaggerOptions);