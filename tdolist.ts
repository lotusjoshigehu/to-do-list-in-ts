// ================= INTERFACE =================
interface Task {
    id: number;
    name: string;
    dueDate: string;
    completed: boolean;
}

// ================= DOM ELEMENTS =================
const taskNameInput = document.getElementById("taskName") as HTMLInputElement;
const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

// ================= DATA =================
let tasks: Task[] = [];

// ================= LOCAL STORAGE =================
function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// ================= RENDER =================
function renderTasks(): void {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = `${task.name} (Due: ${task.dueDate})`;
        if (task.completed) {
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
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
addTaskBtn.addEventListener("click", () => {
    const name = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!name || !dueDate) {
        alert("Please enter task name and due date");
        return;
    }

    const newTask: Task = {
        id: Date.now(),
        name,
        dueDate,
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
