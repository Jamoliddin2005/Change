const { Schema, model } = require('mongoose')

const AboutUsHeaderRight = new Schema({
    text: {
        type: String
    }
})

module.exports = model('AboutUsHeaderRight', AboutUsHeaderRight)