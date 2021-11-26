const { Schema, model } = require('mongoose')

const ChangeItNumber = new Schema({
    text: {
        type: String,
    },
    about: {
        type: String,
    },
})

module.exports = model('ChangeItNumber', ChangeItNumber)