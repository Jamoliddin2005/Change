var express = require('express');
const AboutUsHeaderLeft = require('../models/AboutUs/Header/headerLeft')
const AboutUsHeaderRight = require('../models/AboutUs/Header/HeaderRight')
const ThisIs = require('../models/AboutUs/Section/ThisIs')
const ThisIsImg = require('../models/AboutUs/Section/ThisIsImg')
const ChangeItNumbers = require('../models/AboutUs/Section/ChangeNumbers')
const ChangeItNumbersBlock = require('../models/AboutUs/Section/ChangeNumberBlock')
const Gallery = require('../models/AboutUs/Section/GalleryAdd')

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const header = await AboutUsHeaderLeft.find()
    const headerRight = await AboutUsHeaderRight.find()
    const thisIs = await ThisIs.find()
    const thisImg = await ThisIsImg.find()
    const TextNumbers = await ChangeItNumbers.find()
    const numbersBlock = await ChangeItNumbersBlock.find()
    const gallery = await Gallery.find()

    res.render('pages/aboutus', {
        title: 'Biz haqimizda',
        coursesButton: true,
        header,
        headerRight,
        thisIs,
        thisImg,
        TextNumbers,
        numbersBlock,
        gallery,

    });
});

module.exports = router;