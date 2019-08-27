const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        //const token = req.header('Authorization').replace('Bearer ', '')
        //const decoded = jwt.verify(token, 'milkTeaWithoutIce')
        console.log('Auth...')
        //console.log(decoded)
        next()
    }
    catch (e) {
        res.status(401).send({error: 'A uthentication failed, please log in again'})
    }
}