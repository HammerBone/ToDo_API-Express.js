require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const registerRoute = require("./routes/authRoute")
const todoRoute = require("./routes/todoRoute")

const app = express()
const port = 7415

app.use(express.json())

app.use('/api/auth', registerRoute)
app.use('/api/todo', todoRoute)


mongoose.connect(process.env.db)
    .then(app.listen(port, () => {
        console.log("This app is listening to port", port)
        })
    )


