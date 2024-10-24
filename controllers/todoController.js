const mongoose = require('mongoose')
const User = mongoose.model('user')

const addTodo = async (req, res) => {
    const { title, description } = req.body

    try {
        const todoId = await User.findOne({_id: req.user}, {_id: 0, 'todoList.id': 1}).sort({x: 1})
        let id = 0
        if (!todoId.todoList[0]) {
            id = 1
        }
        else {
            id = todoId.todoList[0].id + 1
        }

        const createTodo = await User.findByIdAndUpdate(req.user, 
            {
                $push: {
                    todoList: { 
                        id: id,
                        title: title, 
                        description: description, 
                        date: new Date()
                    }
                }
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