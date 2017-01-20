//controllers folder - contains Express application controllers; AKA middleware functions
exports.render = function(req, res) {
    res.render('index', {
        title: 'SBHacks',
        // currentUser: req.user ? req.user.username : '' //check if user logged in
        // ? operator picks either req.user.username or '' depending on existence
    })
};