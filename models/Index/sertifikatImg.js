const { Schema, model } = require('mongoose')

const SertifikatImg = new Schema({
    img: {
        type: String
    },
})

module.exports = model('SertifikatImg', SertifikatImg)