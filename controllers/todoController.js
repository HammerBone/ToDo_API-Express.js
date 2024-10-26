const mongoose = require('mongoose')
const User = mongoose.model('user')
const Todo = require("../models/todoModel")

const addTodo = async (req, res) => {
    const { title, description } = req.body

    try {
        const userId = req.user
        const todoId = await Todo.find({}, {_id: 0, id: 1}).sort({x: 1})

        let id = 1
        if (todoId[0] != null) {
            id = todoId[0].id + 1
        }

        const createTodo = await Todo.create({
            id: id,
            title: title,
            description: description,
            userId: userId
        })

        res.json({ 
            id: id,
            title: title, 
            description: description
        })
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {addTodo}