// handle all the requests for user related operations

var User = require('mongoose').model('User');//user model created in users.server.model.js
var passport = require("passport");


exports.renderRegister = function(req, res) {
	res.render('register', {title: 'Register'});
}
exports.renderLogin = function(req, res) {
	res.render('login', {title: "Log In"});
}

exports.register = function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){//only save username to database, not password
        //user object turns password into set of numbers and then stores in database
        if(err){
            // req.flash("error", err.message);
            return res.render("register", {"error": err.message});
        } else {
        	passport.authenticate("local")(req, res, function(){//will log the user in with local strategy
	            // req.flash("success", "Welcome, " + newUser.username + "!");
	            res.redirect("/"); 
        	});
        }
    });
}