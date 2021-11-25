const { Schema, model } = require('mongoose')

const ThisIs = new Schema({
    name: {
        type: String,
    },
    about: {
        type: String,
    },
})

module.exports = model('ThisIs', ThisIs)