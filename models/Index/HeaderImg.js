const {
    Schema,
    model
} = require('mongoose')

const IndexHeader = new Schema({
    img: {
        type: String
    },
})

module.exports = model('IndexHeader', IndexHeader)