const {
    Schema,
    model
} = require('mongoose')

const sectImgMedal = new Schema({
    img: {
        type: String
    },
})

module.exports = model('sectImgMedal', sectImgMedal)