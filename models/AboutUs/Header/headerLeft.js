const { Schema, model } = require('mongoose')

const AboutUsHeaderLeft = new Schema({
    img: {
        type: String
    }
})

module.exports = model('AboutUsHeaderLeft', AboutUsHeaderLeft)