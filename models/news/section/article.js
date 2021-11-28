const { Schema, model } = require('mongoose')

const Article = new Schema({
    title: {
        type: String
    },
    about: {
        type: String
    },
    img: {
        type: String
    },
    data: {
        type: String
    }
})

module.exports = model('Article', Article)