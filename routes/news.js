var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/news', {
        title: 'Change IT-Academy Yangiliklari',
        coursesButton: true
    });
});

module.exports = router;
