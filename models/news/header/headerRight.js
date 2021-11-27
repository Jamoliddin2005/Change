const { Schema, model } = require('mongoose')

const newsHeaderRight = new Schema({
    img: {
        type: String
    }
})

module.exports = model('newsHeaderRight', newsHeaderRight)