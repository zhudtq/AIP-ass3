const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

},{
    timestamps: true
})

// User methods that generate a unique JWT token
userSchema.methods.createToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'milkTeaWithoutIce')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Find user from database by email and password static methods
userSchema.statics.findUserByVerification = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User does not exist')
    }

    const isMatching = await bcrypt.compare(password, user.password)

    if (!isMatching) {
        throw new Error('Please check your email or password')
    }

    return user
}

// Hashing password before storing into database
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User