const express = require('express')
const Chat = require('../models/chatModel')
const auth = require('../middleware/authentication')

const router = new express.Router()

router.post('/chats', async (req, res) => {
    try {
        const chat = new Chat({
            ...req.body
        })
        console.log(chat)
        await chat.save()
        res.status(201).send(chat)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router