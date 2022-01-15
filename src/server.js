var express = require('express');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var news = require('./routes/news')
var health = require('./routes/health')

const API_BASE_PATH = '/api/v1'

var app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(API_BASE_PATH + '/news', news);
app.use(API_BASE_PATH, health);

const filmServ = require('./services/relatedFilmsService.js')

app.use('/prueba', (req, res) => {
   filmServ()
});

module.exports = app;