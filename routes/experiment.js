var express = require('express');
var router = express.Router();
var experiments = {
        snake: {
            name: 'snake',
            about: 'a remake of the classic snake.',
            extraScripts: ["library/colors.js"]
        },
        "find-my-tv": {
            name: 'find-my-tv',
            about: 'How do we have a TV load our pages?',
            extraScripts: [
                "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
            ]
        },
        "drawing-trade-maps": {
        name: 'drawing-trade-maps',
            about: 'A test in making interesing informative dynamic maps about the Kingdom',
            extraScripts: [
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
    console.log(experiments[req.params.name].extraScripts);
    res.render('templates/experiment', {
        name:req.params.name,
        extraScripts:experiments[req.params.name].extraScripts
    })
});

module.exports = router;
