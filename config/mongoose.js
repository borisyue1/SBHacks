//connecting to mongoose and returning the database
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../app/models/users.server.model');//gets the user model

	require('./passport')();
    return db;
};