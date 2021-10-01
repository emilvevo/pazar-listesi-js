// Variables

const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#todo-add");
const clearBtn = document.querySelector("#todo-clear");
const todoList = document.querySelector(".todo-list");
const mainSection = document.querySelector(".main");

system();

function system() {
  addBtn.addEventListener("click", addTodo);
}

window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("todos") === null) {
    system();
  } else {
    JSON.parse(localStorage.getItem("todos")).forEach((localStorageTodo) => {
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.innerHTML = "<i class='fas fa-minus'></i>";
      const todoListContainer = document.createElement("div");
      todoListContainer.className = "todo-list-container";
      const todo = document.createElement("span");
      todo.textContent = localStorageTodo;
      todoListContainer.appendChild(todo);
      todoListContainer.appendChild(removeBtn);
      todoList.appendChild(todoListContainer);
      removeBtn.addEventListener("click", removeTodo);
      clearBtn.addEventListener("click", function (e) {
        todoListContainer.setAttribute("style", "display: none");
        localStorage.clear();
        e.preventDefault();
      });
    });
  }
});

function addTodo(e) {
  if (todoInput.value.trim() != "") {
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "<i class='fas fa-minus'></i>";
    const todoListContainer = document.createElement("div");
    todoListContainer.className = "todo-list-container";
    const todo = document.createElement("span");
    todo.textContent = todoInput.value.trim();
    todoListContainer.appendChild(todo);
    todoListContainer.appendChild(removeBtn);
    todoList.appendChild(todoListContainer);
    setLocalStorage(todo);
    todoInput.value = "";
    removeBtn.addEventListener("click", removeTodo);
    clearBtn.addEventListener("click", function (e) {
      todoListContainer.setAttribute("style", "display: none");
      localStorage.clear();
      e.preventDefault();
    });
  } else {
    alertMessage();
  }
  e.preventDefault();
}

function removeTodo(e) {
  e.target.parentElement.parentElement.remove();
  let localStorageList = JSON.parse(localStorage.getItem("todos"));
  localStorageList.forEach(function (localStorageListItem) {
    if (
      localStorageListItem === e.target.parentElement.parentElement.textContent
    ) {
      localStorageList.splice(
        localStorageList.indexOf(localStorageListItem),
        1
      );
    }
    localStorage.setItem("todos", JSON.stringify(localStorageList));
  });
  e.preventDefault();
}

function setLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    todos.push(todo.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function alertMessage() {
  const alertDiv = document.createElement("div");
  alertDiv.setAttribute("role", "alert");
  alertDiv.className = "alert alert-danger";
  alertDiv.textContent = "Pazara gidiyorsun ve hiçbirşey almayacakmısın ? :)";
  mainSection.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.remove();
  }, 2000);
}
