const express = require('express')
const { verifyToken }  = require("../controllers/authController")
const { getAllTodo, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController")

const router = express.Router()

router.get('/todos', verifyToken, getAllTodo)
router.post('/addTodo', verifyToken, addTodo)
router.put('/updateTodo/:id', verifyToken, updateTodo)
router.delete('/deleteTodo/:id', verifyToken, deleteTodo)

module.exports = router

