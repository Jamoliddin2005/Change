const {
    Schema,
    model
} = require('mongoose')

const IndexHeaderText = new Schema({
    header_text: {
        type: String
    },
    header_span: {
        type: String
    },
    header_about: {
        type: String
    }
})

module.exports = model('IndexHeaderText', IndexHeaderText)