const { ObjectID } = require('mongodb');
const _ = require('lodash');
const fs = require('fs');

const { mongoose } = require('./../db/mongoose');
const { Todo } = require('./../models/todo');

const TodoDb = {};

TodoDb.todoLogs = (todo) => {
    let now = new Date().toString();
    let log = `Todo: ${todo.task} created at ${now}`;
    fs.appendFile('./logs/todo.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append', err);
        }
    });
}

TodoDb.create = (req, res) => {
    const todo = new Todo({
        task: req.body.task
    });

    todo.save().then((result) => {
        //TodoDb.todoLogs(result);
        return res.send(result);
    }).catch((err) => {
        console.log('err', err)
    });
};

TodoDb.getAll = (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send();
    });
};

TodoDb.remove = (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        console.log(err)
    });
};

TodoDb.update = (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['task', 'isDone', 'completedAt']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.isDone) && body.isDone) {
        body.completedAt = Date.now();
    } else {
        body.isDone = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
};

module.exports = { TodoDb };