var express = require('express');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var news = require('./routes/news')
var health = require('./routes/health')

var cors = require('cors')

var corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

const API_BASE_PATH = '/api/v1'

var app = express();

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(API_BASE_PATH + '/news', news);
app.use(API_BASE_PATH, health);

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

module.exports = app;