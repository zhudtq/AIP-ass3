const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
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

        res.send({user})
    }
    catch (e) {
        res.status(400).send()
    }

    // const mima = await bcrypt.hash('password', 8)
    // console.log(mima)
    // const isMatch = await bcrypt.compare('password', mima)
    // console.log(isMatch)


})

module.exports = router