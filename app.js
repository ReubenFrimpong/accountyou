const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerParser = require('swagger-parser')
const { connector } = require('swagger-routes-express');
const morgan = require('morgan');
const api = require('./api');
const AppError = require('./api/utils/app-error');
const { globalErrorHandler } = require('./api/utils/error-handlers');
const { auth, admin } = require('./api/middlewares/auth-middleware');

const makeApp = async () => {
  const parser = new swaggerParser();
  const apiDefinition = await parser.validate('./docs/openapi.yaml');
  const connect = connector(api, apiDefinition) // make the connector
  const app = express() // make the app
  // do any other app stuff, such as wire in passport, use cors etc
  // parse application/json. Without this middleware, the body will be empty
  app.use(express.json());
  
  if (process.env.NODE_ENV === 'DEV') {
    app.use(morgan('dev'));
  }
  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDefinition));
  app.use(auth);
  app.use(admin);

  connect(app); // attach the routes
  
  
  // add any error handlers last
  app.use('*', (req, res, next) => {
    next(new AppError(`Route Not Found ${req.originalUrl}`, 404));
  });

  app.use(globalErrorHandler);

  return app;
}
module.exports = makeApp;