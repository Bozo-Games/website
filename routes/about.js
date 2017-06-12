var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('here');
    res.render('about', { title: 'About Bozo Games' });
});

module.exports = router;
