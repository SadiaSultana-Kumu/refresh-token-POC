const express = require('express')
var cors = require('cors')
require('dotenv').config()
require("./config/database");
require("./models/User");
const AuthRoutes = require('./routes/Auth.route')
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', async (req, res, next) => {
  res.send('Hello World!')
})

app.use('/auth', AuthRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port || 4000}`)
})