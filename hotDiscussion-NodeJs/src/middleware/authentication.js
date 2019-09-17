const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'milkTeaWithoutIce')

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error('no user found!')
        }

        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send({error: 'Authentication failed, please log in again'})
    }
}

module.exports = auth