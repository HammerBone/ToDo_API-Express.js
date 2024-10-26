const { Schema, default: mongoose } = require("mongoose");

const todoSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    userId: String
})

module.exports = mongoose.model("Todo", todoSchema) 