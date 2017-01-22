var passport = require('passport'),
    // url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/user.server.controller');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,//from development.js file
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,//what URL to go back to after registered
        passReqToCallback: true, //pass req as as a paramter
        profileFields: ['id', 'emails', 'name'] //THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    function(req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            name: profile.name.givenName,//from user profile object
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};