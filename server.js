const app = require('./src/app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})