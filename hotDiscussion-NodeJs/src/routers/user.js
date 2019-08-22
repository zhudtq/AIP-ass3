const express = require('express')
const User = require('../models/userModel')

const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.createToken()
        console.log('token: ' + token)
        res.status(201).send({user, token})
    } 
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/login', async function(req, res) {
    res.status(200).send({'status': 'scs'})
    console.log('login successfully')
})

module.exports = router