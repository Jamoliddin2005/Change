const { Schema, model } = require('mongoose')

const TopNews = new Schema({
    title: {
        type: String
    },
    more: {
        type: String
    },
    img: {
        type: String
    },
    data: {
        type: String
    }
})

module.exports = model('TopNews', TopNews)