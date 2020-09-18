//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage;
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //appedn todo list
    todoList.appendChild(todoDiv);
    //clear todo input
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    //Delete button functionality
    if (item.classList[0] === 'trash-btn') {
        item.parentElement.classList.add('fall');
        
        item.parentElement.addEventListener('transitionend', function() {
            removeLocalTodos(item.parentElement);
            item.parentElement.remove();
        })
    }
    
    //checkmrk button
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                };

               
        }
    })
}

function saveLocalTodos(todo) {
    let tod;
    //HEY, is there stuff in there alreaady?
    if(localStorage.getItem("tod") === null) {
        tod = [];
    } else {
        tod = JSON.parse(localStorage.getItem('tod'));
    }
    tod.push(todo);
    localStorage.setItem("tod", JSON.stringify(tod));
}

function getTodos() {
    let tod;
    //HEY, is there stuff in there alreaady?
    if(localStorage.getItem('tod') === null) {
        tod = [];
    } else {
        tod = JSON.parse(localStorage.getItem('tod'));
    }
    tod.forEach(function(todo) {
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //appedn todo list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let tod;
    //HEY, is there stuff in there alreaady?
    if(localStorage.getItem('tod') === null) {
        tod = [];
    } else {
        tod = JSON.parse(localStorage.getItem('tod'));
    }
    const todoIndex = todo.children[0].innerText;
    tod.splice(tod.indexOf(todoIndex), 1);
    localStorage.setItem('tod', JSON.stringify(tod));
}