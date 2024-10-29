const mongoose = require('mongoose')
const User = mongoose.model('user')
const Todo = require("../models/todoModel")

const getAllTodo = async (req, res) => {
    try {
        const { page, limit } = req.query
        const todoList = await Todo.find()
        const todoListTotal = todoList.length

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = todoList.slice(startIndex, endIndex)

        res.status(200).json({ data: result, page: page, limit: limit, total: todoListTotal })
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addTodo = async (req, res) => {
    const { title, description } = req.body

    try {
        const userId = req.user
        const todoId = await Todo.find({}, {_id: 0, id: 1}).sort({id: -1})

        let id = 1
        if (todoId[0] != null) id = todoId[0].id + 1

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

const updateTodo = async (req, res) => {
    try {
        const userId = req.user
        const { id } = req.params
        const { title, description } = req.body

        const todo = await Todo.findOne({ id: id }, { userId: 1, _id:0})

        if (userId != todo.userId) {
            res.status(403).json({message: "Forbidden"})
        }
        else {
            const todoUpdate = await Todo.updateOne({ id: id }, { title: title, description: description })
            res.status(200).json({ id: id, title: title, description: description })
        }
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user
        const userTodo = await Todo.findOne({ id: id }, { _id: 0, userId: 1 })
        if (!userTodo) {
            res.status(404).json({ message: "Data not found"})
        }

        else if (userTodo.userId != userId) {
            res.status(403).json({ message: "Forbidden"}) 
        }
        else {
            const todoDelete = await Todo.findOneAndDelete({ id: id })
            res.status(204).json({})
        }  
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllTodo, addTodo, updateTodo, deleteTodo }