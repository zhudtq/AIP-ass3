const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// User model configurations
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

// user methods that generate a unique JWT token
userSchema.methods.createToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'milkTeaWithoutIce')

    // make tokens one list property of each user
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User