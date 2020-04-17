const express = require('express')

const { db } = require('./db')
const todoRoute = require('./routes/todos')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/todos', todoRoute)

db.sync()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Our app is running on port ${ PORT }`);
        });

    })
    .catch((err) => {
        console.error(err)
    })