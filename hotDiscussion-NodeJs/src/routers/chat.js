const express = require('express')
const Chat = require('../models/chatModel')
const auth = require('../middleware/authentication')
//const multer = require('multer')
const storage = require('../middleware/chattingImage')
const router = new express.Router()

//const storage = multer({dest: 'me/'})

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

router.post('/images', storage.single('image'), async (req, res) => {
    try {
        if (!req.file){
            console.log('no file received...')
            return res.status(401).send({
            message: false
        })
        }
        else {
            console.log('file received')
            console.log(req.file)
            return res.send({
                ...req.file
            })
        }
    }  
    catch (e) {

    }
})

module.exports = router