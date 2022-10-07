// selectors
let todoInput = document.querySelector(".todoInput");
let todoButton = document.querySelector(".todoButton");
let todoList = document.querySelector(".todoList");
let fillterTodo = document.querySelector(".fillterTodo");
// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCkeck);
fillterTodo.addEventListener("click", fillterTodos);
// functions
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value != "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("newTodo");
    todoDiv.appendChild(newTodo);

    saveLocalStorage(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completeBtn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  }
  todoInput.value = "";
}
function deleteCkeck(e) {
  let item = e.target;
  if (item.classList[0] === "trash") {
    const parent = item.parentElement;
    parent.classList.add("fall");

    removeLocalStorage(parent);

    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
  }
  if (item.classList[0] === "completeBtn") {
    const parent = item.parentElement;
    parent.classList.toggle("completed");
  }
}

function fillterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("newTodo");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completeBtn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todosIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todosIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
