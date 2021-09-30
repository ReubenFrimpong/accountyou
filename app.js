const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-spec');

const app = express();

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;