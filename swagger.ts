import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API'
    },
  },
  apis: ['./src/routes/*.ts'], // Replace with the actual path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;