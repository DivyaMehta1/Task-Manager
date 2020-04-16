const { Router } = require('express')
const { Todos } = require('../db')

const route = Router()

route.get('/', async(req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)

})

route.get('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }

    const todo = await Todos.findByPk(req.params.id)

    if (!todo) {
        return res.status(404).send({
            error: 'No todo found with id = ' + req.params.id,
        })
    }
    res.send(todo)
})

route.post('/', async(req, res) => {
    try {

        if (typeof req.body.title == null) {
            return res.status(400).send({ error: 'Task not appropriate' })
        }

    } catch (err) {
        console.log(err);
    }
    if (req.body.status === "") {
        req.body.status = 'Incomplete'
    }
    if (req.body.priority === "") {
        req.body.priority = 'Medium'
    }
    if (req.body.duedate === "") {
        req.body.duedate = new Date();
    }
    try {
        const newTodo = await Todos.create({
            title: req.body.title,
            description: req.body.description,
            duedate: req.body.duedate,
            priority: req.body.priority,
            status: req.body.status,
        })

        res.status(201).send({ success: 'New task added', data: newTodo })

    } catch (e) {
        console.error(e);
    }


})
route.patch('/todos/:id', async(req, res) => {
    res.send("YOu are trying to update todos with id " + req.params.id)

})
route.get('/todos/notes', async(req, res) => {
    res.send("YOu are trying to access notes  " + req.params.id)

})
route.post('/todos/notes/:id', async(req, res) => {
    res.send("YOu are trying to update notes with id " + req.params.id)

})
route.delete('/:id', function(req, res, next) {

    Todos.findByPk(req.params.id).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                error: 'No todo found with id = ' + req.params.id,
            })
        }
        return todo.destroy();
    }).then(() => {
        res.redirect('/');
    });
});
module.exports = route