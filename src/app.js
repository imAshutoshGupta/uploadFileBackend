const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.js')
const dashboardRoute = require('./routes/dashboard.js')
const adminRoute = require('./routes/admin.js')

const app = express()

app.use(cors({
    origin: 'https://cloud-vault-sigma.vercel.app', 
    credentials: true,
}))

app.options('*', cors({
    origin: 'https://cloud-vault-sigma.vercel.app',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser()) 



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/admin', adminRoute)



module.exports = app