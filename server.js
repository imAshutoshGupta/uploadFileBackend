const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const authRoutes = require('./src/routes/auth.js')
const dashboardRoute = require('./src/routes/dashboard.js')
const adminRoute = require('./src/routes/admin.js')

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://cloud-vault-sigma.vercel.app'],
    credentials: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'] 
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://cloud-vault-sigma.vercel.app')
  res.header('Access-Control-Allow-Credentials', 'true')
  console.log('Headers set for CORS debugging.')
  next()
})

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://cloud-vault-sigma.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.send();
});

app.use((req, res, next) => {
console.log('CORS headers set for:', req.method, req.url);
next();
});

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err))

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

module.exports = app;
