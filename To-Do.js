document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = getTasks();
  renderTasks(tasks);
}
 
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const btnGroup = document.createElement("div");
    btnGroup.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";
    delBtn.onclick = () => deleteTask(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const tasks = getTasks();
  tasks.push({ text: text, completed: false });
  saveTasks(tasks);
  renderTasks(tasks);
  input.value = "";
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks(tasks);
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks(tasks);
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    renderTasks(tasks);
  }
}
