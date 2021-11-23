const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerParser = require('swagger-parser')
const { connector } = require('swagger-routes-express');
const api = require('./api');
const ErrorHandler = require('./api/utils/app-handler');
const { globalErrorHandler } = require('./api/utils/error-handlers');

const makeApp = async () => {
  const parser = new swaggerParser();
  const apiDefinition = await parser.validate('./docs/openapi.yaml');
  const connect = connector(api, apiDefinition) // make the connector
  const app = express() // make the app
  // do any other app stuff, such as wire in passport, use cors etc
  // parse application/json. Without this middleware, the body will be empty
  app.use(express.json());
  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDefinition));
  

  connect(app); // attach the routes

  // add any error handlers last
  app.use('*', (req, res, next) => {
    next(new ErrorHandler(`Route Not Found ${req.originalUrl}`, 404));
  });
  app.use(globalErrorHandler);

  return app;
}
module.exports = makeApp;