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
            return res.render("register", {"error": "Something went wrong"});
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
    res.redirect("back");
}

exports.renderLinks = function(req, res) {
	if(!res.locals.currentUser) {
		req.flash("error", "You must be signed in to save links and access this page.");
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
	User.findById(req.user._id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/search");
       } else {
       	var name = req.body.name;
	    var url = req.body.link;
	    var owner = {
	        id: req.user._id,
	        username: req.user.username
	    }
	    var newLink = {name: name, link: url, owner: owner};
	    var newlyCreated = new link(newLink);
	    newlyCreated.save(function(err){
	    	if(err){
	    		console.log(err);
               req.flash("error", "Something went wrong");
               res.redirect('back')
           } else {
           		newlyCreated.owner.id = req.user._id;
                //save link
                user.urls.push(newlyCreated);
                user.save();
                req.flash("success", "Successfully added link");
                // res.render('saved', {links: user.urls});
                res.redirect('/saved');
           }
	    })
       }
   });
};

exports.deleteLink = function(req, res){
	var id = req.params.id.replace(':', '');
	link.findById(id, function(err, foundLink){
		if(err){
       		req.flash("error", "Something went wrong");
           	res.redirect("back");
       } else {
       		User.findById(req.user._id, function(err, user){
       			var index = user.urls.indexOf(foundLink);
       			user.urls.splice(index, 1);
       		});
       }
	});
	link.findByIdAndRemove(id, function(err){
       if(err){
       		req.flash("error", "Something went wrong");
           	res.redirect("back");
       } else {
       		res.redirect('/');
       }
    });
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
                                req.flash('error', message);
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
