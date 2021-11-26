const { Schema, model } = require('mongoose')

const ChangeItNumberBlock = new Schema({
    number: {
        type: String,
    },
    about: {
        type: String,
    },
})

module.exports = model('ChangeItNumberBlock', ChangeItNumberBlock)