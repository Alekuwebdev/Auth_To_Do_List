require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

// connect to db and listen server
mongoose.set('strictQuery', false) // Removal of the impairment warning
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log('listen on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


