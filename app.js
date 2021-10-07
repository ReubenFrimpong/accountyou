const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { connector } = require('swagger-routes-express');
const YAML = require('yamljs');
const api = require('./api');

const makeApp = () => {
  const apiDefinition = YAML.load('./_build/openapi.yaml') // load the api as json
  const connect = connector(api, apiDefinition) // make the connector
  const app = express() // make the app
  // do any other app stuff, such as wire in passport, use cors etc

  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDefinition));

  connect(app); // attach the routes

  // add any error handlers last

  return app;
}
module.exports = makeApp();