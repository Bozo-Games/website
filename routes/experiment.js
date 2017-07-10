var express = require('express');
var router = express.Router();
var experiments = {
        snake: {
            name: 'snake',
            about: 'a remake of the classic snake.',
            extraScripts: [
                "library/helpers.js",
                "library/colors.js",
            ],
            externalScripts: [],
            cssStyles:[]
        },
        "find-my-tv": {
            name: 'find-my-tv',
            about: 'How do we have a TV load our pages?',
            extraScripts: [
                "library/helpers.js",
                "library/colors.js",
                "library/cast-sender.js"],
            externalScripts: [
                "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1",
                "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js",
            ],
            cssStyles:["find-my-tv/style.css"]
        },
        "drawing-trade-maps": {
        name: 'drawing-trade-maps',
            about: 'A test in making interesing informative dynamic maps about the Kingdom',
            extraScripts: [
                "library/helpers.js",
                "library/colors.js",
                "library/geometry.js",
                "experiments/drawing-trade-maps/models/region.js",
                "experiments/drawing-trade-maps/models/road.js",
                "experiments/drawing-trade-maps/models/land.js",
                "experiments/drawing-trade-maps/models/rhill-voronoi-core.js"
        ],
            externalScripts: [],
            cssStyles:[]
    }
    };
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('experiments', {
        title: 'Some things to try',
        experiments:experiments
    });
});

router.get('/:name', function(req,res, next) {
    res.render('templates/experiment', {
        name:req.params.name,
        extraScripts:experiments[req.params.name].extraScripts,
        externalScripts:experiments[req.params.name].externalScripts,
        cssStyles:experiments[req.params.name].cssStyles,
    })
});

module.exports = router;
