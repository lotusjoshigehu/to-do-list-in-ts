// ================= DOM ELEMENTS =================
var taskNameInput = document.getElementById("taskName");
var dueDateInput = document.getElementById("dueDate");
var addTaskBtn = document.getElementById("addTaskBtn");
var taskList = document.getElementById("taskList");
// ================= DATA =================
var tasks = [];
// ================= LOCAL STORAGE =================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}
// ================= RENDER =================
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        var span = document.createElement("span");
        span.textContent = "".concat(task.name, " (Due: ").concat(task.dueDate, ")");
        if (task.completed) {
            span.classList.add("completed");
        }
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (t) { return t.id !== task.id; });
            saveTasks();
            renderTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
// ================= ADD TASK =================
addTaskBtn.addEventListener("click", function () {
    var name = taskNameInput.value.trim();
    var dueDate = dueDateInput.value;
    if (!name || !dueDate) {
        alert("Please enter task name and due date");
        return;
    }
    var newTask = {
        id: Date.now(),
        name: name,
        dueDate: dueDate,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskNameInput.value = "";
    dueDateInput.value = "";
});
// ================= INIT =================
loadTasks();
renderTasks();
