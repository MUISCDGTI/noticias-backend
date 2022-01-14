const mongoose = require('mongoose');
var config = require('../config/config');

const DB_URL = config.MONGO_URL;

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection errror: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true});
}

module.exports = dbConnect;


