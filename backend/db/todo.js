const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/todo', ['todos']);

controller = {};

controller.create = async (req, res) => {
    const todo = req.body;
    db.todos.save(todo, (err, todo) => {
        if (err) { res.send(err); }
        res.json(todo);
    });
}

controller.getAll = async (res) => {
    db.todos.find((err, todos) => {
        if (err) { res.send(err); }
        res.json(todos);
    });
}

controller.update = async (req, res) => {
    const todo = req.body;
    const upd = {};

    upd.todoTask = todo.todoTask;
    upd.todoIsDone = todo.todoIsDone;
    upd.todoDate = todo.todoDate;

    db.todos.update({ _id: mongojs.ObjectId(req.params.id) }, upd, (err, todo) => {
        res.json(todo);
    });
}

controller.delete = async (req, res) => {
    db.todos.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, todo) => {
        if (err) { res.send(err); }
        res.json(todo);
    });
}

module.exports = controller;