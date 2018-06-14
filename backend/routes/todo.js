const express = require('express');
const router = express.Router();
const { TodoDb } = require('../db/todo');

router.post('/todo', (req, res) => {
    TodoDb.create(req, res);
});

router.get('/todo', (req, res) => {
    TodoDb.getAll(req, res);
});

router.delete('/todo/:id', (req, res) => {
    TodoDb.remove(req, res);
});

router.patch('/todo/:id', (req, res) => {
    TodoDb.update(req, res);
});

module.exports = router;