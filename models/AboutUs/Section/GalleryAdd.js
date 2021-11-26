const { Schema, model } = require('mongoose')

const GalleryAdd = new Schema({
    img: {
        type: String,
    },
})

module.exports = model('GalleryAdd', GalleryAdd)