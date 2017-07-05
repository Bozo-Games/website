var express = require('express');
var router = express.Router();
var receivers = {
    "found-my-tv": {
        images: [],
        audio: [],
        extraScripts: [
            "library/helpers.js",
            "library/colors.js",
        ],
        externalScripts: [
            "https://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js",
        ],
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
            audio: receivers[req.params.name].audio,
            extraScripts:receivers[req.params.name].extraScripts,
            externalScripts:receivers[req.params.name].externalScripts
        })
    } else {
        res.render('index', { title: 'Bozo Games' });
    }
});

module.exports = router;
