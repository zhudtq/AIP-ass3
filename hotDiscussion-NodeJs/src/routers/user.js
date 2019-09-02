const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/authentication')

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

module.exports = router