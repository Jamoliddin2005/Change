const {
    Schema,
    model
} = require('mongoose')

const IndexSectionTopLeft = new Schema({
    lesson_name: {
        type: String
    },
    about_the_lesson: {
        type: String
    },
    img: {
        type: String
    },
    date: {
        type: String
    },
})

module.exports = model('IndexSectionTopLeft', IndexSectionTopLeft)