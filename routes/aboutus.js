var express = require('express');
const AboutUsHeaderLeft = require('../models/AboutUs/Header/headerLeft')
const AboutUsHeaderRight = require('../models/AboutUs/Header/HeaderRight')
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const header = await AboutUsHeaderLeft.find()
    const headerRight = await AboutUsHeaderRight.find()
    res.render('pages/aboutus', {
        title: 'Biz haqimizda',
        coursesButton: true,
        header,
        headerRight
    });
});

module.exports = router;
