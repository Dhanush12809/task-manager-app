const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/taskRouter')

//middleware
app.use(cors())
app.use(express.json())
//routes
app.use('/api', router)

//database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongodb Connected sucessfully'))
  .catch((error) => {
    console.log(error)
  })
//portal
const PORT = process.env.PORT || 5877
app.listen(PORT, () => {
  console.log(`app running at ${PORT}`)
})
