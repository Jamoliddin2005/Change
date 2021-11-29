const { Schema, model } = require('mongoose')

const auth = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

module.exports = model('auth', auth)