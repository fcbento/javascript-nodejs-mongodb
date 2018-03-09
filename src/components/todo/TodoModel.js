class TodoModel {

    constructor(todo) {
        this.todoTask = todo;
        this.todoIsDone = false;
        this.todoDate = Date.now();
    }
}

export default TodoModel;