const express = require('express')
require('./mongoDb/dbConnection')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./routers/user')
const chatRouter = require('./routers/chat')

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(userRouter)
app.use(chatRouter)

app.listen(port, () => {
    console.log('Express server starts on port ' + port)
})