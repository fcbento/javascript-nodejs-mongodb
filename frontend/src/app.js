import 'bulma/css/bulma.css';
import './css/style.css';
import TodoController from './components/todo.controller';

const todoController = new TodoController();
console.log(todoController)

//Init
todoController.createTodo();
todoController.getAllTodos();
