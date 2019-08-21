const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User