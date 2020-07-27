import TodoService from './todo.service.js';
import Modules from '../modules/Modules'

const todoService = new TodoService();
const modules = new Modules();

class TodoController {

    createTodo() {

        document.getElementById('createToDo').addEventListener('click', () => {
            const task = document.getElementById('todoTask').value;
            if (task) {
                const todo = {
                    task,
                    createdAt: new Date().getTime()
                }
                todoService.create(todo);
                const notify = modules.displayNotification();
            } else {
                this.notify = modules.displayDanger();
            }
        });
    }

    getAllTodos() {

        todoService.get().then((data) => {
            const todos = data;
            for (let todo of todos) {
                const newDate = modules.convert(todo.createdAt);
                document.querySelector('.todo-list').innerHTML += `
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child box level">
                            <div class="level-left">
                                <p class="taskTitle">${todo.task} </p>
                             </div>
                             <div class="control level-item">
                                  <input class="input" type="text" placeholder="What do I have to do?" id="todoEdit_${todo._id}" style="display:none">
                             </div>
                            <div class="level-right">
                               <span id="date"> Created ${newDate.date} at ${newDate.time} </span>
                            </div>  
                                <span class="icon">
                                    <a id="deleteTodo_${todo._id}"> <i class="fas fa-times fa-1x"></i> </a>
                                </span>
                                <span class="icon">
                                    <a id="editTodo_${todo._id}"><i class="fas fa-edit fa-1x"></i> </a>
                                </span>
                                <span class="icon">
                                   <a id="saveEdit_${todo._id}" style="display:none;"> <i class="far fa-save fa-1x"></i> </a>
                                </span>
                                <span class="icon">
                                   <a id="cancelEdit_${todo._id}"style="display:none; margin-left:1rem"> <i class="fas fa-undo fa-1x"></i> </a>
                                </span>
                            <div id="loader_${todo._id}" style="display:none;margin-left:15rem">
                                 <img src="http://datainflow.com/wp-content/uploads/2017/09/loader.gif" width="150px" alt="">
                            </div>
                        </article>
                   </div>
                </div>
              `
            }
            this.deleteTodo(todos);
            this.editTodo(todos);
        });
    }


    deleteTodo(todos) {
        for (let todo of todos) {
            //Get all buttons passing ID as parameter
            const element = document.querySelectorAll(`#deleteTodo_${todo._id}`);
            
            for (let el of element) {
                //Add click to button clicked
                el.addEventListener('click', () => {
                    todoService.delete(todo._id).then((data) => {
                        //Display/Hide loader
                        const displayLoader = modules.loader(todo._id);
                    });
                });
            }
        }
    }

    //Display and hide buttons
    openEdition(todo) {
        document.getElementById(`todoEdit_${todo._id}`).style.display = 'block';;
        document.getElementById(`saveEdit_${todo._id}`).style.display = 'block';
        document.getElementById(`deleteTodo_${todo._id}`).style.display = 'none';;
        document.getElementById(`editTodo_${todo._id}`).style.display = 'none';;
        document.getElementById(`cancelEdit_${todo._id}`).style.display = 'block';
        this.closeEdtion(todo);
    }

    closeEdtion(todo) {
        document.getElementById(`cancelEdit_${todo._id}`).addEventListener('click', () => {
            document.getElementById(`todoEdit_${todo._id}`).style.display = 'none';;
            document.getElementById(`saveEdit_${todo._id}`).style.display = 'none';
            document.getElementById(`deleteTodo_${todo._id}`).style.display = 'block';;
            document.getElementById(`editTodo_${todo._id}`).style.display = 'block';;
            document.getElementById(`cancelEdit_${todo._id}`).style.display = 'none';
        });
    }

    editTodo(todos) {
        todos.forEach((todo) => {
            const editBtns = document.querySelectorAll(`#editTodo_${todo._id}`);
            editBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    //Open edit
                    this.openEdition(todo);
                    //Save
                    this.saveEdition(todo);
                });
            });
        });
    }

    saveEdition(todo) {
        const saveBtn = document.getElementById(`saveEdit_${todo._id}`);
        saveBtn.addEventListener('click', () => {
            const input = document.getElementById(`todoEdit_${todo._id}`);

            const task = input.value;
            if (task) {
                todo.todoTask = task;
                todoService.update(todo);
                const mdl = modules.loader(todo._id);
            } else {
                this.mdl = modules.displayDanger();
            }

        });
    }
}

export default TodoController;