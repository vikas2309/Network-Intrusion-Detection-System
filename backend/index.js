const connectToMongo =  require('./db')
const express = require('express')
var cors = require('cors')
// require("dotenv").config();

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))


if(process.env.NODE_ENV==='production'){
  app.use(express.static('../client/build'))
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})