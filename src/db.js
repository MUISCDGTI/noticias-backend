const mongoose = require('mongoose');
const DB_URL = ('mongodb://localhost/news');

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection errror: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true});
}

module.exports = dbConnect;


