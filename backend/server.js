require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')

// express app
const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/todos', todoRoutes)

// connect to db and listen server
mongoose.set('strictQuery', false) // Removal of the impairment warning
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log('listen on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })