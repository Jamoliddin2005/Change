const { Schema, model } = require('mongoose')

const newsHeaderLeft = new Schema({
    text: {
        type: String
    }
})

module.exports = model('newsHeaderLeft', newsHeaderLeft)