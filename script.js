//Retrieves todo from local storage or creates an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".button");
const deleteButton = document.getElementById("deleteButton");

//Start Initialization for any changes made, making it a dynamic page
document.addEventListener("DOMContentLoaded", function () {
    //Add button clicked = perform following function
    addButton.addEventListener("click", addTask);
    //Enter pressed = addTask, preventing default action
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    })
    //Delete All Button clicked = perform following function
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});
//Adds new tasks to todo array based on value entered, as long as its not empty. Then saves task to local storage for persistence.
function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

//Generate HTML elements for each task, including checkboxes and text, and also add event listeners for task interactions. 
function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.id = `input-${index}`;
        if (item.disabled) {
            checkbox.checked = true;
        }
        
        const textParagraph = document.createElement("p");
        textParagraph.textContent = item.text;
        textParagraph.id = `todo-${index}`;
        if (item.disabled) {
            textParagraph.classList.add("disabled");
        }
        textParagraph.onclick = () => editTask(index);
        
        todoContainer.appendChild(checkbox);
        todoContainer.appendChild(textParagraph);
        
      todoContainer.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
      
      todoList.appendChild(todoContainer);
    });
    todoCount.textContent = todo.length;
}
//Provide functionality for dynamically editing task items in the to-do list.
function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    })
}

//Function to toggle the status of a task(True/False Enabled/Disabled)
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}
//Provides functionality to clear all tasks from the to-do list, updates local storage, and updates UI(User Interface)
function deleteAllTasks() {
        todo = [];
        saveToLocalStorage();
        displayTasks();
}
//Save current state of the 'todo' array to local storage, ensuring that any changes made to the to-do list are preserved.
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}