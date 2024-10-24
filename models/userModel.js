const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    todoList: [{ id: Number, title: String, description: String, date: Date }]
})

module.exports  = userSchema 