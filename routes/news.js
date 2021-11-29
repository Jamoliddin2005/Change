var express = require('express');
const NewsHeaderLeft = require('../models/news/header/headerText')
const NewsheaderRight = require('../models/news/header/headerRight')
const TopNews = require('../models/news/section/topNews')
const Article = require('../models/news/section/article')
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const headerLeft = await NewsHeaderLeft.find()
    const headerRight = await NewsheaderRight.find()
    const articleFind = await Article.find()
    const news = await TopNews
        .find({})
        .sort({
            img: -1,
        })
        .limit(7)
    const newsTop = await TopNews
        .find({})
        .sort({
            img: -1,
        })
        .limit(1)
    res.render('pages/news', {
        title: 'Change IT-Academy Yangiliklari',
        coursesButton: true,
        headerLeft,
        headerRight,
        news,
        newsTop,
        articleFind
    });
});

module.exports = router;