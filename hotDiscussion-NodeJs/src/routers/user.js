const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/authentication')
//const uploadphoto = require('../middleware/profilephoto')
const sharp = require('sharp');
const multer = require('multer')

const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        console.log(req.body)
        await user.save()
        const token = await user.createToken()
        res.status(201).send({user, token})
    } 
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUserByVerification(req.body.email, req.body.password)
        const token = await user.createToken()

        res.send({user, token})
    }
    catch (e) {
        res.status(400).send()
    }

})

router.delete('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch (e) {
        res.status(500).send()
    }
})

const uploadphoto = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, uploadphoto.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router