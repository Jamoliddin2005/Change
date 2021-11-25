const mongoose = require('mongoose');
const URI = 'mongodb+srv://Jamoliddin:qwerty750@cluster0.dktr4.mongodb.net/ChangeIt'

module.exports = async() => {
    try {
        await mongoose.connect(URI);

        const db = mongoose.connection

        db.on('error', console.error.bind(console, 'Console error'))
        db.once('open', function() {
            console.log('MongoDB success connected');
        })

    } catch (error) {
        console.log(error);
    }
}