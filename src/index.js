const app = require('./server.js');
var config = require('../config/config');
const dbConnect = require('./db');

const PORT = config.PORT;
const HOST = config.HOST;

console.log("Starting API server at "+ PORT);
app.listen(PORT, HOST);
/** 
dbConnect().then(
    () => {
     
        console.log("Server ready!");
    },
    err => {
        console.log("Connection error: "+err);
    }
)
*/
