const {
    Schema,
    model
} = require('mongoose')

const SectionDirection = new Schema({
    name: {
        type: String
    },
    month: {
        type: String
    },
    module: {
        type: String
    },
    img: {
        type: String
    }
})

module.exports = model('SectionDirection', SectionDirection)