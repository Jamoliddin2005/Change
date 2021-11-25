const { Schema, model } = require("mongoose");

const IndexSectionTopRight = new Schema({
    lesson_name_right: {
        type: String,
    },
    about_the_lesson_right: {
        type: String,
    },
    img_right: {
        type: String,
    },
    date: {
        type: String
    }
});

module.exports = model("IndexSectionTopRight", IndexSectionTopRight);