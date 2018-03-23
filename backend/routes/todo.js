const express = require('express');
const router = express.Router();
const dbTodo = require('../db/todo');

router.post('/todo', (req, res, next) => {
    dbTodo.create(req, res);
});

router.get('/todo', (req, res, next) => {
    dbTodo.getAll(res);
});

router.delete('/todo/:id', (req, res, next) => {
    dbTodo.delete(req, res);
});

router.put('/todo/update/:id', (req, res, next) => {
    dbTodo(req, res);
});

module.exports = router;