var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('experiments', {
        title: 'Some things to try',
        experiments: [
            {
                name:'snake',
                about:'a remake of the classic snake.'
            },{
                name:'test 2',
                about:'this is junk data'
            }
        ]
    });
});

router.get('/:name', function(req,res, next) {
    res.render('templates/experiment', {
        name:req.params.name
    })
});

module.exports = router;
