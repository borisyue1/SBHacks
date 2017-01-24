//sets up routes
var express = require("express");
var router = express.Router();
var index = require('../controllers/index.server.controller');
    
// router.get('*', index.render);    
router.get('/', index.render);
router.get('/search', index.renderSearch);



module.exports = router;