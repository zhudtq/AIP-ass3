const multer = require('multer')

const stor = multer.diskStorage({
    destination: function (req, file, myFunc) {
        myFunc(null, './temp/')
    },
    filename: function (req, file, cb){
        cb (null, Date.now() + '.jpg')
    }
})

const storage = multer({storage: stor})

module.exports = storage