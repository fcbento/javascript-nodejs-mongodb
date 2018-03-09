const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/todo', ['todos']);

router.post('/todo', (req, res, next) => {
    const todo = req.body;
    db.todos.save(todo, (err, todo) => {
        if (err) { res.send(err); }
        res.json(todo);
    });
});


router.get('/todo', (req, res, next) => {
    db.todos.find((err, todos) => {
        if (err) { res.send(err); }
        res.json(todos);
    });
});

router.delete('/todo/:id', (req, res, next) => {
    db.todos.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, todo) => {
        if (err) { res.send(err); }
        res.json(todo);
    });
});

router.put('/todo/update/:id', (req, res, next) => {
    var todo = req.body;
    var upd = {};

    if (todo.todoTask) {
        upd.todoTask = todo.todoTask;
    }

    if (todo.todoIsDone) {
        upd.todoIsDone = todo.todoIsDone;
    } else {
        upd.todoIsDone = todo.todoIsDone;
    }

    if (todo.todoDate) {
        upd.todoDate = todo.todoDate;
    }

    db.todos.update({ _id: mongojs.ObjectId(req.params.id) }, upd, (err, todo) => {
        res.json(todo);
    });
});

module.exports = router;