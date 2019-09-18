

const express = require('express')
const Chat = require('../models/chatModel')
const auth = require('../middleware/authentication')
const upload = require('../middleware/chattingImage')
const router = new express.Router()
const User = require('../models/userModel')
const changePostPic = require('../middleware/editPost')
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
        const chatList = await Chat.find({}).sort({ '_id': -1 })
        res.status(200).send(chatList)
    }
    catch (e) {
        res.status(404).send()
    }
})

router.get('/chat/:id', async (req, res) => {
    try {
        const chattingId = req.params.id
        const singleChatting = await Chat.findOne({_id: chattingId})
        if(singleChatting) {
            return res.send(singleChatting)
        }
    }
    catch (e) {
        res.status(401).send()
    }
})

router.post('/edit/:id',auth, changePostPic.single('image'), async (req, res) =>{
    try{
        const id = req.params.id
        console.log('12333')
        console.log(id)
        res.send({id})
        const editPost = await Chat.save()
        res.status(201).send(editPost)
        console.log(editPost)

    }
    catch (e) {
        res.status(404).send()
    }


})

router.delete('/delete/:id',auth, async (req, res) => {
    try {
        const id = req.params.id
        const deletePost = await Chat.findOne({_id: id})
        deletePost.remove()
        res.status(201).send("delete successfully")


    } catch (e) {
        res.status(404).send()
    }
})
router.put('/like/:id',auth, async (req, res) => {
    try {
        const id = req.params.id
        let likedPost = await Chat.findOne({_id: id})

        for (let i =0; i<likedPost.likes.length; i++){
            if(likedPost.likes[i].liker == req.user.name){
                likedPost.likes.splice(i,1)
                await likedPost.save()
                return res.status(201).send(likedPost)
            }
        }

        likedPost.likes.push({liker: req.user.name})
        await likedPost.save()
        res.status(201).send(likedPost)


    } catch (e) {
        res.status(404).send(likedPost)
    }
})
module.exports = router
