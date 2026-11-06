const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");

let tasks = [];

function updateTaskCount() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `${total} task${total === 1 ? "" : "s"} • ${completed} completed`;
  emptyMessage.hidden = total !== 0;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = task.completed ? "task-item completed" : "task-item";
    listItem.dataset.id = task.id;

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-button";
    completeButton.dataset.action = "complete";
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.setAttribute(
      "aria-label",
      task.completed ? `Mark ${task.text} as incomplete` : `Mark ${task.text} as complete`
    );

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

    listItem.append(taskText, completeButton, deleteButton);
    taskList.appendChild(listItem);
  });

  updateTaskCount();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.focus();
    return;
  }

  tasks.push({
    id: Date.now() + Math.random(),
    text,
    completed: false
  });

  taskInput.value = "";
  taskInput.focus();
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const listItem = button.closest(".task-item");
  const taskId = Number(listItem.dataset.id);

  if (button.dataset.action === "complete") {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  if (button.dataset.action === "delete") {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  renderTasks();
});

renderTasks();
