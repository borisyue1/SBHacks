//controllers folder - contains Express application controllers; AKA middleware functions
exports.render = function(req, res) {
    res.render('index', {
        title: 'SBHacks',
    })
};

exports.renderSearch = function(req, res) {
	res.render('search', {
        title: 'Search',

    });
};