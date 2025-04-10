const inputBox = document.getElementById("inputask");
const listtask = document.getElementById("listcontainer");

function addTask() {
    const text = inputBox.value.trim();
    if (text === '') {
        alert("Write something!!");
        return;
    }
    createTaskElement(text, false);
    inputBox.value = "";
    saveTasks();
}

function createTaskElement(text, checked) {
    const li = document.createElement("li");
    li.textContent = text;
    if (checked) li.classList.add("check");
    listtask.appendChild(li);
}

listtask.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    // إذا تم الضغط على علامة × (يمين العنصر)
    if (e.offsetX > li.clientWidth - 40) {
        li.remove();
    } else {
        li.classList.toggle("check");
    }

    saveTasks();
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#listcontainer li").forEach(li => {
        tasks.push({
            text: li.textContent,
            checked: li.classList.contains("check")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function show() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            createTaskElement(task.text, task.checked);
        });
    }
}
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

show();
