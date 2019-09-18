const multer = require('multer')
const fs = require('fs')

// middleware that create directory and accept, store uploading images
const change = multer.diskStorage({
    destination: function (req, file, cb) {
        const id = req.params.id
        let basePath = 'upload/' + id

        let baseServerUrl = 'http://localhost:3000/'
        req.myFileUrl = baseServerUrl + id + '/' + 'main.jpg'

        cb (null, basePath)
    },
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only jpg jpeg png image formate accepted.'))
        }
        cb(undefined, true)
    },
    filename(req, file, cb){
        cb (null, 'main.jpg')
    }
})

const changePostPic = multer({storage: change})

module.exports = changePostPic
