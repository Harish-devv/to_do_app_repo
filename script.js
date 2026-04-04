let input = document.getElementById("input");
let addButton = document.getElementById("addBtn");
let allClearButton = document.getElementById("clearAllBtn");
let selectAll = document.getElementById("selectAll");
let list = document.getElementById("list");


let totalTasks = document.getElementById("total");
let completedTasks = document.getElementById("completed");
let remainingTasks = document.getElementById("remaining");

let currentFilter = "all";


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
showTasks();

addButton.onclick = () => {
    addTask();
}

allClearButton.onclick = () => {
    clearTasks();
}

selectAll.onclick = () => {
    tasks.forEach(task => {
        task.done = true;
        showTasks();
    })
}
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
    addTask();
    }
});

function setFilter(filter){
    currentFilter = filter;
    showTasks();
}

function addTask(){
    if(input.value === "") return;

    tasks.push({
        text: input.value,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    showTasks();
}

function clearTasks(){

    let confirmDeletion = confirm("Do you want to clear all the tasks?");

    if(confirmDeletion){
    tasks.splice(0, tasks.length);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    }
}

function showTasks(){
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if(currentFilter === "completed" && !task.done) return;
        if(currentFilter === "pending" && task.done) return;

        let div = document.createElement("div");
        
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.done;

        let span = document.createElement("span");
        span.innerText = task.text;

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.marginLeft = "5px";

        editButton.onclick = () => {
            let newTask = prompt("Edit your task: ", task.text);

            if(newTask !== null && newTask.trim() !== ""){
                tasks[index].text = newTask.trim();
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            }
        }

        let delButton = document.createElement("button");
        delButton.innerText = "Delete";
        delButton.style.marginLeft = "5px";

        delButton.onclick = () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        }

        checkBox.onchange = () => {
            task.done = checkBox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        }

        list.append(div);
        div.append(checkBox, span, editButton, delButton);
    });
    updateCounter();
}

function updateCounter(){
    let total = tasks.length;
    let completed = tasks.filter(task => task.done).length;
    let remaining = total - completed;

    totalTasks.innerText = total;
    completedTasks.innerText = completed;
    remainingTasks.innerText = remaining;
}