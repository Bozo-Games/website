var express = require('express');
var router = express.Router();
var experiments = {
        snake: {
            name: 'snake',
            about: 'a remake of the classic snake.',
            extraScripts: []
        },
        "find-my-tv": {
            name: 'find-my-tv',
            about: 'How do we have a TV load our pages?',
            extraScripts: [
                "http://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"
            ]
        }
    };
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(experiments);
    res.render('experiments', {
        title: 'Some things to try',
        experiments:experiments
    });
});

router.get('/:name', function(req,res, next) {

    res.render('templates/experiment', {
        name:req.params.name,
        extraScripts:experiments[req.params.name].extraScripts
    })
});

module.exports = router;
