const { Schema, model } = require('mongoose')

const GalleryAdd = new Schema({
    img: {
        type: String,
    },
    text: {
        type: String
    }
})

module.exports = model('GalleryAdd', GalleryAdd)