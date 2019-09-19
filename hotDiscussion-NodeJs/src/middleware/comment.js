const multer = require('multer')

// middleWare that stores the comment images in specific owner directory
const up = multer.diskStorage({
    destination: function (req, file, cb) {
        let basePath = 'upload/' + req.params.path + '/comments/'
        cb (null, basePath)
        console.log(req.params.path)
        console.log(basePath)
    },
    filename(req, file, cb){
        let date = Date.now()
        const userName = req.user.name
        req.finalPath = 'http://localhost:3000/' + req.params.path + '/comments/' + userName + '&&' + date + '.jpg'
        cb (null, userName + '&&' + date + '.jpg')
    }
})

const comment = multer({storage: up})

module.exports = comment