let optionSelected;
let backgroundSelected;
displayStoredNotes();
initForm();

function initForm() {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("taskDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("taskTime").value = time;
}

function displayStoredNotes() {
  Object.keys(localStorage).forEach((key) => {
    createTaskInUi(JSON.parse(localStorage.getItem(key)));
  });
}

function addNewTask() {
  const taskName = document.getElementById("taskName").value;
  const taskInfo = document.getElementById("task_info").value;
  const taskDate = document.getElementById("taskDate").value;
  const taskTime = document.getElementById("taskTime").value;
  const taskId = `${taskName}-card`;
  const taskType = onDropDownSelected();
  let newTask = {
    task_id: taskId,
    task_name: taskName,
    task_info: taskInfo,
    task_date: taskDate,
    task_time: taskTime,
    task_type: taskType,
  };
  if (valiadateForm(newTask)) {
    createTaskInUi(newTask);
    localStorage.setItem(newTask.task_id, JSON.stringify(newTask));
    cleanForm();
  }
}

function onDropDownSelected() {
  let dropdown = document.querySelector(".dropdown.nontes");
  let options = dropdown.querySelector(".dropdown-menu");
  let optionItems = options.querySelectorAll("li");
  const dropDownContainer = document.querySelector("#dropDownButton");
  let selectButton = dropDownContainer.querySelector("#dropdownMenuButton");
  const chooseOption = (option) => {
    optionSelected = option.getAttribute("data-value");
  };
  optionItems.forEach(function (option, i) {
    option.addEventListener("click", function () {
      chooseOption(option);
      selectButton.innerHTML = option.innerHTML;
    });
  });
  return optionSelected;
}

const valiadateForm = (newTask) => {
  const localDate = new Date().toISOString().split("T")[0];
  let missingTitle = document.getElementById("missingTitle");
  let missingInfo = document.getElementById("missingInfo");
  let missingDate = document.getElementById("missingDate");

  const myToast = Toastify({
    text: "You have to choose note",
    duration: 2000,
  });
  if (newTask.task_name === "") {
    missingTitle.innerHTML = "Task title required";
    return false;
  }
  missingTitle.innerHTML = '<i class="fas fa-check-circle"></i>';
  if (newTask.task_info === "") {
    missingInfo.innerHTML = "Task info required";
    return false;
  }
  missingInfo.innerHTML = '<i class="fas fa-check-circle"></i>';
  if (newTask.task_date < localDate) {
    missingDate.innerHTML = "Task date required";
    return false;
  }
  missingDate.innerHTML = '<i class="fas fa-check-circle"></i>';
  if (newTask.task_time === "") {
    console.log(`${taskTime} is empty`);
    return false;
  }
  if (!newTask.task_type || newTask.task_type === undefined) {
    myToast.showToast();
    return false;
  }
  return true;
};

function createTaskInUi(newTask) {
  const container = document.querySelector("#container");
  const card = document.createElement("div");
  const cardBacground = `url('assets/${newTask.task_type}.png`;
  setAttributes(card, {
    class: "card",
    id: `${newTask.task_id}`,
    style: `background-image: ${cardBacground}`,
  });
  createTaskButtons(newTask, card);
  // card body
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  // header
  const cardHeader = document.createElement("h3");
  cardHeader.setAttribute("class", "card_header");
  cardHeader.innerText = newTask.task_name;

  // cardinfo
  const cardText = document.createElement("p");
  cardText.setAttribute("class", "ptext");
  cardText.innerText = newTask.task_info;

  cardBody.append(cardHeader, cardText);
  createTimesContainer(cardBody, newTask);
  container.appendChild(card).appendChild(cardBody);
}

function createTimesContainer(cardBody, newTask) {
  const timesContainer = document.createElement("p");
  timesContainer.setAttribute("class", "card-text date_time");
  const taskTime = document.createElement("span");
  taskTime.innerText = newTask.task_time;
  const taskDateSpan = document.createElement("span");
  taskDateSpan.innerText = newTask.task_date;
  taskDateSpan.setAttribute("class", "card-text date_time");

  cardBody.appendChild(timesContainer).append(taskTime, taskDateSpan);
}

function createTaskButtons(newTask, card) {
  const deleteButton = document.createElement("button");
  setAttributes(deleteButton, {
    class: "fa fa-trash",
    onclick: "removeTask(this)",
  });
  const editButton = document.createElement("button");
  setAttributes(editButton, {
    class: "fas fa-edit",
    onclick: "editTask(this)",
  });
  const saveButton = document.createElement("button");
  setAttributes(saveButton, {
    class: "fa fa-check saveB",
    onclick: "saveTask(this)",
  });
  if (newTask.task_type != "notebg") {
    saveButton.style = "color: white";
  }
  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "card-title");
  buttonsContainer.append(deleteButton, editButton, saveButton);
  card.appendChild(buttonsContainer);
}

function removeTask(taskElement) {
  const container = document.querySelector("#container");
  const parentElement = taskElement.parentNode;
  const noteElement = parentElement.parentNode;
  const confirmation = confirm("Are you sure you want to delete this note?");
  if (confirmation) {
    noteElement.style.setProperty("animation", "fadeOut 4s");
    setTimeout(() => {
      container.removeChild(noteElement);
      localStorage.removeItem(noteElement.id);
    }, 3500);
  }
}

function editTask(taskElement) {
  const firstChild = taskElement.parentElement;
  const childElement = taskElement.parentNode;
  const parentElement = childElement.parentElement;
  const cardBody = parentElement.childNodes[1];
  const cardHeader = cardBody.childNodes[0];
  const saveButton = firstChild.childNodes[2];
  saveButton.style.display = "block";

  for (let index = 0; index < cardBody.childNodes.length; index++) {
    cardBody.childNodes[index].setAttribute("contenteditable", "true");
  }
  preventHeader(cardHeader);
  let children = parentElement.childNodes;
  const saveButtonClicked = children[0].childNodes[2].onclick;
  if (saveButtonClicked.onclick) {
    saveTask(parentElement);
  }
  return;
}

function preventHeader(NoteElement) {
  NoteElement.addEventListener("keypress", function (e) {
    if (e.key.toLowerCase() === "enter") {
      e.preventDefault();
    }
    return false;
  });
}

function saveTask(taskElement) {
  let newTaskData = {};
  let taskHeader;
  let taskInfo;
  const childElement = taskElement.parentNode;
  const parentElement = childElement.parentElement;
  const parentElementId = parentElement.id;
  const saveButton = childElement.childNodes[2];
  let children = parentElement.childNodes;
  let cardText = children[1];
  const myToast = Toastify({
    text: "Your note need to have title",
    duration: 2000,
    destination: null,
    position: "left",
  });
  saveButton.style.display = "none";
  taskHeader = children[1].childNodes[0].innerText;
  if (taskHeader == "") {
    myToast.showToast();
    return false;
  }
  taskInfo = children[1].childNodes[1].innerText;
  newTaskData = {
    task_name: taskHeader,
    task_info: taskInfo,
  };
  for (let index = 0; index < cardText.childNodes.length; index++) {
    cardText.childNodes[index].setAttribute("contenteditable", "false");
  }
  updateTaskInStorage(newTaskData, parentElementId);
}

function updateTaskInStorage(newTaskData, parentElementId) {
  const existing = JSON.parse(localStorage.getItem(parentElementId));
  if (existing) {
    const taskDataObj = { ...existing, ...newTaskData };
    localStorage.setItem(parentElementId, JSON.stringify(taskDataObj));
  }
}

function cleanForm() {
  let titleInputClean = document.getElementById("taskName");
  titleInputClean.value = "";
  let textInputClean = document.getElementById("task_info");
  textInputClean.value = "";
  let dateInputClean = document.getElementById("taskDate");
  dateInputClean.value = "";
  let timeInputClean = document.getElementById("taskTime");
  timeInputClean.value = "";
  let missingTitle = document.getElementById("missingTitle");
  let missingInfo = document.getElementById("missingInfo");
  let missingDate = document.getElementById("missingDate");
  missingTitle.innerHTML = "";
  missingInfo.innerHTML = "";
  missingDate.innerHTML = "";
}
