var express = require('express');
var router = express.Router();
var receivers = {
    "found-my-tv": {
        images: [],
        audio: []
    }
};
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Bozo Games' });
});

router.get('/:name', function(req,res, next) {
    if(receivers[req.params.name] !== undefined) {
        res.render('templates/cast-receiver', {
            name: req.params.name,
            images: receivers[req.params.name].images,
            audio: receivers[req.params.name].audio
        })
    } else {
        res.render('index', { title: 'Bozo Games' });
    }
});

module.exports = router;
