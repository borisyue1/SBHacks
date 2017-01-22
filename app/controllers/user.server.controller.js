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

exports.logout = function(req, res) {
    req.logout();//coming from passport
    // req.flash("success", "Logged you out!"); //flash message
    res.redirect("/");
}

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        },
        function(err, user) {
            if (err) {
            return done(err);
            }
            else {
                if (!user) {
                    //if not registered yet, generate a unique username
                    var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                    //profile username might not exist
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);//facebook profile
                        //if username is unique, save the user
                        user.save(function(err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                // req.flash('error', message);
                                return res.redirect('/register');
                            }

                            return done(err, user);
                        });
                    });
                }
                else {
                    return done(err, user);
                }
            }
        }
    );
};