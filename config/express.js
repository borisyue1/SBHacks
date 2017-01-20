//basically sets up the express application and then returns it
//contains initialization code of our Express application
var express = require('express'),
    bodyParser = require('body-parser');
    // passport = require('passport'),
    // flash = require('connect-flash');//flash mesages

module.exports = function() {
    var app = express();
    //bodyparser 
    app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());//returns middleware that only parses json
	//setting up directory access
    app.set('views', './app/views');
	app.set('view engine', 'ejs');
	app.use(express.static('./public'));//to use image, example: <img src="img/logo.jpg">
	//passport
	// app.use(require("express-session")({
	//     secret: "Boris is awesome",
	//     resave: false,
	//     saveUninitialized: false
	// }));
	// app.use(passport.initialize());
	// app.use(passport.session());
	// //flash
	// app.use(flash());//flash messages
	// app.use(function(req, res, next){
	//     res.locals.error = req.flash("error");//flash messages shared among all files
	//     res.locals.success = req.flash("success");
	//     next();
	// });

	//routes
    app.use(require('../app/routes/index.server.routes.js'));//creates the '/' route
    // app.use(require('../app/routes/users.server.routes.js'));//using user routes
    return app; 
};