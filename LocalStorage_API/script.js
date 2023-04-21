const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

// add and save task to local storage
//localStorage.setItem("firstname", "Alex");
// get item
//const result = localStorage.getItem("firstname");
// remove item
//localStorage.removeItem("firstname");

// delete task

const removeTask = (id) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks", tasks));
  }
  tasks = tasks.filter((task) => {
    return task.id !== +id;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
};

// get items

const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // display to dom

  let output;
  const allTasks = tasks.map((task) => {
    return `
    <li id="item">
    <span>${task.tite}</span>
    <button id="delete" onclick="removeTask(${task.id})">X</button>
  </li>
    `;
  });
  output = allTasks.join("");
  outputEl.innerHTML = output;
};
getTasks();
// create and add items
const addTask = (e) => {
  e.preventDefault();
  if (inputEl.value === "") {
    alert("Please enter a task");
  }
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.unshift({
      id: Date.now(),
      tite: task,
    });
    // save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // empty input
    inputEl.value = "";
  }
  getTasks();
};

form.addEventListener("submit", addTask);
