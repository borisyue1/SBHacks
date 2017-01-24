// handle all the requests for user related operations

var User = require('mongoose').model('User');//user model created in users.server.model.js
var link = require('mongoose').model('Link');
var passport = require("passport");


exports.renderRegister = function(req, res) {
	res.render('register', {title: 'Register'});
}
exports.renderLogin = function(req, res) {
	res.render('login', {title: "Log In", errors: req.flash('error')});
}

exports.register = function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){//only save username to database, not password
        //user object turns password into set of numbers and then stores in database
        if(err){
            req.flash("error", err.message);
            return res.render("register", {"error": err.message});
        } else {
        	passport.authenticate("local")(req, res, function(){//will log the user in with local strategy
	            req.flash("success", "Welcome, " + newUser.username + "!");
	            res.redirect("/search"); 
        	});
        }
    });
}

exports.logout = function(req, res) {
    req.logout();//coming from passport
    req.flash("success", "Logged you out!"); //flash message
    res.redirect("/");
}

exports.renderLinks = function(req, res) {
	if(!res.locals.currentUser) {
		req.flash("error", "You must be signed in to access this page.");
		res.redirect('/register')
	}
	res.render('saved', {title: "Saved Links"});
}

exports.saveLinks = function(req, res) {
	if(!res.locals.currentUser) {
		req.flash("error", "You must be signed in to access this page.");
		res.redirect('/register');
		return
	}
	User.findById(req.params.id, function(err, user){
		console.log(user);
       if(err){
           console.log(err);
           res.redirect("/search");
       } else {
        link.create(req.body.info, function(err, foundLink){
           if(err){
               req.flash("error", "Something went wrong");
               res.redirect('/search')
           } else {
               //add username and id to comment
               foundLink.owner.id = req.user._id;
               //save comment
               foundLink.save();
               User.links.push(foundLink);
               User.save();
               console.log(req.body.info);
               req.flash("success", "Successfully added comment");
               res.redirect('/saved');
           }
        });
       }
   });
};

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