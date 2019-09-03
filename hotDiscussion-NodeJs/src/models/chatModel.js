const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    mainImage: {
        type: String,
        require: true
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        liker: {
            type: String,
            //require: true
        }
    }],
    comments: [{
        commenter: {
            type: String,
            //require: true
        },
        content: {
            type: String,
            //require: true
        }
    }],
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat