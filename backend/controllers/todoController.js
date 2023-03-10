const mongoose = require('mongoose')
const Todo = require('../models/todoModel')

// GET all todos
const getTodos = async (req, res) => {
    const user_id = req.user._id

    const todos = await Todo.find({user_id}).sort({createdAt: -1})

    res.status(200).json(todos)
}

// GET a single todo
const getTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo'})
    }

    const todo = await Todo.findById(id)

    if(!todo) {
        return res.status(404).json({error: 'No such todo'})
    }
    res.status(200).json(todo)
}


// POST (create) a new todo
const createTodo = async (req, res) => {
    const { title, content } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!content) {
        emptyFields.push('content')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const todo = await Todo.create({ title, content, user_id })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo'})
    }

    const todo = await Todo.findByIdAndDelete({_id: id})

    if(!todo) {
        return res.status(404).json({error: 'No such todo'})
    }

    res.status(200).json(todo)
}

// UPDATE a todo
const updateTodo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todo'})
    }

    const todo = await Todo.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!todo) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(todo)

}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}