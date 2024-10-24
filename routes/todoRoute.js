const express = require('express')
const { verifyToken }  = require("../controllers/authController")
const {addTodo} = require("../controllers/todoController")

const router = express.Router()

router.post('/addTodo', verifyToken, addTodo)

module.exports = router

