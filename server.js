const express = require('express')

const { db } = require('./db')
const todoRoute = require('./routes/todos')
const port = process.env.PORT || 8080
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/todos', todoRoute)

db.sync()
    .then(() => {
        app.listen(port)
        console.log('server running at port' + port)
    })
    .catch((err) => {
        console.error(err)
    })