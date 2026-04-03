let input = document.getElementById("input");
let addButton = document.getElementById("addBtn");
let list = document.getElementById("list");

addButton.onclick = () => {
    addTask();
}

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
    addTask();
    }
});

function addTask(){
    if(input.value === "") return;

    let task = document.createElement("div");
    task.className = "tasks";

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    let taskName = document.createElement("span");
    taskName.innerText = input.value;

    let delButton = document.createElement("button");
    delButton.innerText = "Delete";
    delButton.className = "delButton";

    delButton.onclick = () => {
    task.remove();
    }

    checkBox.addEventListener("change", () => {
        if(checkBox.checked){
            task.style.backgroundColor = "green";
        } else{
            task.style.backgroundColor = "gray";
        }
    })

    list.append(task);
    task.append(checkBox);
    task.append(taskName);
    task.append(delButton);

    input.value = "";
}