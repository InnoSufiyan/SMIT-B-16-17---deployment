const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const dns = require('node:dns')
const cors = require('cors')

const authRoutes = require('./routes/AuthRoutes')
const usersRoutes = require('./routes/UsersRoutes')

dns.setServers([
    '1.1.1.1', '8.8.8.8'
])

dotenv.config()

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({
        status: true,
        message: "Backend is working properly"
    })
})

// authentication
// signup login
app.use('/api/v1/auth', authRoutes)

// Users
// get , add, update, delete
app.use('/api/v1/users', usersRoutes)

// Products
// get , add, update, delete




app.use((err, req, res, next) => {
    if (err == "Naseem") {
        res.status(500).json({
            status: true,
            message: "This error is to show naseem bhai k error aya hai"
        })
    }
    console.log("===>> going till here")


    if (err == 'Database timeout') {
        throw "new error"
    }
})

app.use((err, req, res, next) => {
    res.status(200).json({
        status: true,
        data: err
    })
})



app.listen(process.env.PORT, () => {
    console.log("Server is running on Port number", process.env.PORT)
})