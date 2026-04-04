let input = document.getElementById("input");
let addButton = document.getElementById("addBtn");
let allClearButton = document.getElementById("clearAllBtn");
let selectAll = document.getElementById("selectAll");
let dueDate = document.getElementById("dueDate");
let dueTime = document.getElementById("dueTime");

let list = document.getElementById("list");


let totalTasks = document.getElementById("total");
let completedTasks = document.getElementById("completed");
let remainingTasks = document.getElementById("remaining");

let currentFilter = "all";
let draggedIndex = null;


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
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();

}
document.querySelector(".input-box").addEventListener("keydown", (e) => {
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
        done: false,
        duedate: dueDate.value,
        duetime: dueTime.value,
        pinned: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    dueDate.value = "";
    dueTime.value = "";

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

        tasks.sort((a, b) => b.pinned - a.pinned);

    tasks.forEach((task, index) => {
        if(currentFilter === "completed" && !task.done) return;
        if(currentFilter === "pending" && task.done) return;


        let div = document.createElement("div");
        div.draggable = true;
        
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.done;

        let span = document.createElement("span");
        span.innerText = task.text;

        let pin = document.createElement("button");
        pin.innerText = task.pinned ? "Unpin" : "Pin";
        pin.style.margin = "5px";

        let small = document.createElement("small");

        if(task.duedate && task.duetime){
        small.innerText = " (Due: " + " " + task.duedate + ", " + task.duetime +")"
        }

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.margin = "5px";

        pin.addEventListener("click", () => {
            task.pinned = !task.pinned;
            pin.innerText = task.pinned ? "Unpin" : "Pin";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        })

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

        div.addEventListener("dragstart", ()=> {
            draggedIndex = index;
        });

        div.addEventListener("dragover", (e) => {
            e.preventDefault();
        })

        div.addEventListener("drop", () => {
            let temp = tasks[draggedIndex];
            tasks[draggedIndex] = tasks[index];
            tasks[index] = temp;

            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();

        })

        list.append(div);
        div.append(checkBox, span, pin, small, editButton, delButton);
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