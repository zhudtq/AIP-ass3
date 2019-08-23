const express = require('express')
require('./mongoDb/dbConnection')
const cors = require('cors')
const loginRouter = require('./routers/user')

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())
app.use(loginRouter)

app.listen(port, () => {
    console.log('Express server starts on port ' + port)
})