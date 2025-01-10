const app = require('./src/app')
const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors({
    origin: 'https://cloud-vault-sigma.vercel.app', 
    credentials: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}))

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})