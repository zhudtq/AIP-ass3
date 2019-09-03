const express = require('express')
const Chat = require('../models/chatModel')
const auth = require('../middleware/authentication')
const upload = require('../middleware/chattingImage')
const router = new express.Router()

router.post('/chats', auth, upload.single('image'), async (req, res) => {
    const chat = new Chat({
        mainImage: req.myFileUrl,
        ownerName: req.user.name,
        ownerId: req.user._id
    })
    
    try {
        await chat.save()
        console.log(req.myFileUrl)
        res.status(201).send(chat)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/chats', async (req, res) => {
    try {
        const chatList = await Chat.find({})
        res.status(200).send(chatList)
    }
    catch (e) {
        res.status(404).send()
    }
})

// router.post('/images', storage.single('image'), async (req, res) => {
//     try {
//         if (!req.file){
//             console.log('no file received...')
//             return res.status(401).send({
//             message: false
//         })
//         }
//         else {
//             console.log('file received')
//             console.log(req.file)
//             return res.send({
//                 ...req.file
//             })
//         }
//     }  
//     catch (e) {

//     }
// })

module.exports = router