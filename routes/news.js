var express = require('express');
const NewsHeaderLeft = require('../models/news/header/headerText')
const NewsheaderRight = require('../models/news/header/headerRight')
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const headerLeft = await NewsHeaderLeft.find()
    const headerRight = await NewsheaderRight.find()
    res.render('pages/news', {
        title: 'Change IT-Academy Yangiliklari',
        coursesButton: true,
        headerLeft,
        headerRight
    });
});

module.exports = router;