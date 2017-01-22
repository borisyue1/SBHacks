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

module.exports = router;