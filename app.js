process.env.NODE_ENV = process.env.NODE_ENV || 'development';//referring to development.js file, don't technically need this line

var config = require('./config/config'),
    mongoose = require('./config/mongoose'), //creates mongoose db
    express = require('./config/express');//creates routes and pretty much everything else
    // passport = require('./config/passport');//creates passport authentication

//initializing everyting
var db = mongoose(),
    app = express();
    // passport = passport();


app.listen(config.port);

console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);