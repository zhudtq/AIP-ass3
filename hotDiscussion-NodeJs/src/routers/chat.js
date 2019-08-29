const express = require('express')
const Chat = require('../models/chatModel')
const auth = require('../middleware/authentication')
const multer = require('multer')

const router = new express.Router()

const storage = multer({dest: 'me/'})

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
    console.log('image coming')
    // try {
    //     if (!req.file){
    //         console.log('no file received...')
    //         return res.send({
    //         message: false
    //     })
    //     }
    //     else {
    //         console.log('file received')
    //         return res.send({
    //             message: true
    //         })
    //     }
    // }
    // catch (e) {

    // }
    console.log(req.file)
    res.send({mes: true})
})

module.exports = router