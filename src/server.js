var express = require('express');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var news = require('./routes/news')
var health = require('./routes/health')

var breaker = require('express-circuit-breaker')

var CB = breaker({
  catchError: e => 'trip',
  handleBlockedRequest: (req, res) => res.sendStatus()
})

const API_BASE_PATH = '/api/v1'

var app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(API_BASE_PATH + '/news', CB,  news);
app.use(API_BASE_PATH, CB,  health);

app.get('/hola', CB, (req, res) => {
    console.log('hola')
    throw 1
} )

module.exports = app;