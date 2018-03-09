import 'bulma/css/bulma.css';
import './css/style.css';
import TodoService from './components/todo/TodoService';

const todoService = new TodoService();

//Init
todoService.createTodo();
todoService.getAllTodos();
