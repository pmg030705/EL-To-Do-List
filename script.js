document.addEventListener("DOMContentLoaded", () => {
  // Grab elements

  let todoInput = document.getElementById("todo-input");
  let addTaskButton = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //load back tasks arrays

  tasks.forEach((task) => renderTasks(task)); // logs the objects in the array with the help of renderTasks

  addTaskButton.addEventListener("click", () => {
    let taskText = todoInput.value.trim();
    if (taskText === "") return;

    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks(newTask);

    todoInput.value = "";
    console.log(tasks);
  });

  function renderTasks(task) {
    console.log(task);
    let li = document.createElement("li");

    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `;

    li.addEventListener("click", (e) => {
      // console.log(e);
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");

      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id === task.id);
      // console.log(e);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
