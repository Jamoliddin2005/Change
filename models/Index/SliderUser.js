const { Schema, model } = require('mongoose')

const SliderUser = new Schema({
    name: {
        type: String
    },
    course: {
        type: String
    },
    img: {
        type: String
    },
    instagram: {
        type: String
    },
    telegram: {
        type: String
    },
    linkedin: {
        type: String
    }
})

module.exports = model('SliderUser', SliderUser)