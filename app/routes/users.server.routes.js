//creates routes for users

var users = require('../controllers/user.server.controller');
var express = require("express"),
	passport = require("passport");
var router = express.Router();


router.get("/login", users.renderLogin);
router.get("/register", users.renderRegister);

router.post("/register", users.register);
router.post("/login", passport.authenticate("local", {
	    successRedirect: "/",
	    failureRedirect: "/login",
	    // failureFlash: "Invalid username or password",
	    // successFlash: "Successfully logged in!"
	}));

router.get("/logout", users.logout);

//facebook auth
router.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope:['email']//provides access to email
}));

router.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope:['email']
}));

//twitter auth
router.get('/oauth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/login'
}));

router.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/'
}));

module.exports = router;