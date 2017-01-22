var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');


//authenticating user
module.exports = function() {
    //User.authenticate comes from passport-local-mongoose
    // passport.use(User.createStrategy());//newer version

    passport.use(new LocalStrategy(User.authenticate()));

};