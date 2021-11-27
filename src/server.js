var express = require('express');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var news = require('./routes/news')
var health = require('./routes/health')

var config = require('../config/config');

const PORT = config.port;
const HOST = config.host;
const API_BASE_PATH = '/api/v1'

var app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(API_BASE_PATH + '/news', news);
app.use(API_BASE_PATH, health);
  
app.listen(PORT, HOST);

console.log(`Servidor iniciado en http://${HOST}:${PORT}`)

module.exports = app;