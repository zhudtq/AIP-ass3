const express = require('express')
require('./mongoDb/dbConnection')

const app = express()
const port = 3000

app.listen(port, () => {
    console.log('Express server starts on port ' + port)
})

