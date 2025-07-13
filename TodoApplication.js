const todoItemsContainerElem = document.getElementById("todoItemsContainer");
const addToDoButton = document.getElementById("todoAddButton");
const saveButtonElem = document.getElementById("saveButton");

function getToDoListItemsFromLocalStorage() {
  let stringifiedTodoItems = localStorage.getItem("todoList");
  let parsedTodoItems = JSON.parse(stringifiedTodoItems);
  if (stringifiedTodoItems === null) {
    return [];
  } else {
    return parsedTodoItems;
  }
}
let todoList = getToDoListItemsFromLocalStorage();
let toDoCount = todoList.length;

saveButtonElem.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function todoItemStatusChanged(checkboxId, labelId, todoId) {
  const checkboxElem = document.getElementById(checkboxId);
  const labelElem = document.getElementById(labelId);
  labelElem.classList.toggle("checked");
  let todoObjectIndex = todoList.findIndex(function (eachToDo) {
    let todoItemId = "todo" + eachToDo.uniqueNo;
    if (todoItemId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  let todoObject = todoList[todoObjectIndex];
  if (todoObject.checkedStatus === true) {
    todoObject.checkedStatus = false;
  } else {
    todoObject.checkedStatus = true;
  }
}

function onDeleteToDo(todoId) {
  const todoElem = document.getElementById(todoId);
  todoItemsContainerElem.removeChild(todoElem);
  let deleteTodoItemIndex = todoList.findIndex(function (eachToDo) {
    let eachToDoId = "todo" + eachToDo.uniqueNo;
    if (eachToDoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(deleteTodoItemIndex, 1);
}

function createTodoItem(todo) {
  let checkboxId = "checkboxInput" + todo.uniqueNo;
  let labelId = "labelinput" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;
  let deleteIconId = "deleteIcon" + todo.uniqueNo;
  const itemElem = document.createElement("li");
  itemElem.classList.add("todo-item-container", "d-flex", "flex-row");
  itemElem.id = todoId;
  const checkboxElem = document.createElement("input");
  checkboxElem.type = "checkbox";
  checkboxElem.classList.add("checkbox-input");
  checkboxElem.id = checkboxId;
  checkboxElem.checked = todo.checkedStatus;
  checkboxElem.onclick = function () {
    todoItemStatusChanged(checkboxId, labelId, todoId);
  };
  itemElem.appendChild(checkboxElem);
  const todoLabelContainerElem = document.createElement("div");
  todoLabelContainerElem.classList.add(
    "todo-label-container",
    "d-flex",
    "flex-row"
  );
  itemElem.appendChild(todoLabelContainerElem);
  const todoLabelElem = document.createElement("label");
  todoLabelElem.setAttribute("for", checkboxId);
  todoLabelElem.id = labelId;
  todoLabelElem.classList.add("label-input");
  todoLabelElem.textContent = todo.text;
  if (checkboxElem.checked === true) {
    todoLabelElem.classList.add("checked");
  }
  todoLabelContainerElem.appendChild(todoLabelElem);
  const deleteIconcontainerElem = document.createElement("div");
  deleteIconcontainerElem.classList.add("delete-icon-container");
  todoLabelContainerElem.appendChild(deleteIconcontainerElem);
  const deleteIconElem = document.createElement("i");
  deleteIconElem.classList.add("fa", "fa-trash-o", "delete-icon");
  deleteIconElem.id = deleteIconId;
  deleteIconcontainerElem.appendChild(deleteIconElem);
  deleteIconElem.onclick = function () {
    onDeleteToDo(todoId);
  };
  todoItemsContainerElem.appendChild(itemElem);
}
for (let todo of todoList) {
  createTodoItem(todo);
}

addToDoButton.onclick = function () {
  onAddToDo();
};
function onAddToDo() {
  let userInputElem = document.getElementById("todoUserInput");
  let userInputValue = userInputElem.value.trim();
  if (userInputValue === "") {
    alert("Enter valid text");
    return;
  }
  toDoCount = toDoCount + 1;
  let newToDo = {
    text: userInputValue,
    uniqueNo: toDoCount,
    checkedStatus: false,
  };
  todoList.push(newToDo);
  createTodoItem(newToDo);
  userInputElem.value = "";
}
