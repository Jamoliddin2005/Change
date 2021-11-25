const { Schema, model } = require('mongoose')

const ListGroup = new Schema({
    list_group: {
        type: String
    },
    tab_pane: {
        type: String
    }
})

module.exports = model('ListGroup', ListGroup)