const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: "3.0.0",
    info: {
      title: "AccountYou",
      version: "0.1.0",
      description:
          "API documentation for AccountYou",
      contact: {
          name: "Reuben Frimpong",
      },
    },
    servers: [
      {
          url: "http://localhost:3000",
      },
    ],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;