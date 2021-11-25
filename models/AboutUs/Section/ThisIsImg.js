const { Schema, model } = require('mongoose')

const ThisIsImg = new Schema({
    img: {
        type: String,
    },
})

module.exports = model('ThisIsImg', ThisIsImg)