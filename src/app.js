const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.js')
const dashboardRoute = require('./routes/dashboard.js')
const adminRoute = require('./routes/admin.js')

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173', 'https://upload-file-frontend-rust.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(cookieParser()) 



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/admin', adminRoute)



module.exports = app