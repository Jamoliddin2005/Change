const {
    Schema,
    model
} = require('mongoose')

const HeaderCourse = new Schema({
    header_courses: {
        type: String
    },
})

module.exports = model('HeaderCourse', HeaderCourse)