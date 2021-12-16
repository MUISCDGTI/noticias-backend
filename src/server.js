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
app.use(function circuitBreaker(err, req, res, next) {
    console.log('aaaaa')

    if (req.circuitTripped) {
        console.log('hola')
        return
    }

    if (err) {
        console.log('adios')
        req.circuitTripped = true;
        next()
    }
    console.log('adios2')
    next();


});

module.exports = app;