'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const errorHandler = require('./src/utils/errorHandler')
require('custom-env').env('uat');
require('custom-env').env('prod');

require('./src/config/database');

const services = require("./src/services");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(services);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}...`);
  console.log(`Running on ${process.env.NODE_ENV.trim()} environment...`);
});

module.exports = app;