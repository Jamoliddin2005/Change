const {
    Schema,
    model
} = require('mongoose')

const SectionCenterRight = new Schema({
    name: {
        type: String
    },
    about: {
        type: String
    },
    ul_li_a_1: {
        type: String
    },
    ul_li_a_2: {
        type: String
    },
    ul_li_a_3: {
        type: String
    },
})

module.exports = model('SectionCenterRight', SectionCenterRight)