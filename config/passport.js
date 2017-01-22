//setting up passport
var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');


    require('./strategies/local.js')();
    // require('./strategies/facebook.js')();
    // require('./strategies/twitter.js')();
    
    //User.serialize/deserialize comes from passport-local-mongoose
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

    
};