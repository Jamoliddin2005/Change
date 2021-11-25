const {
    Schema,
    model
} = require('mongoose')

const SectionCenterLeft = new Schema({
    img: {
        type: String
    },
})

module.exports = model('SectionCenterLeft', SectionCenterLeft)