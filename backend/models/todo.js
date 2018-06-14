const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {

    task: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    isDone: {
        type: Boolean,
        required: true,
        default: false,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },

    completedAt: {
        type: Date,
        default: null
    }
});

module.exports = { Todo };