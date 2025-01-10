const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.js')
const dashboardRoute = require('./routes/dashboard.js')
const adminRoute = require('./routes/admin.js')

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://cloud-vault-sigma.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

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