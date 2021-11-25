const {
    Schema,
    model
} = require('mongoose')

const Partner = new Schema({
    img: {
        type: String
    },
    href: {
        type: String
    }
})

module.exports = model('Partner', Partner)