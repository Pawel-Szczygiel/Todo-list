let $todoInput; // miejsce gdzie użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadania / konieczność dodania tekstu
let $addBtn; // przycisk ADD dodaje elementy do listy
let $ulList; // nasza lista zadań <ul></ul>
let $newTask; // nowo dodany LI nowe zadanie
let $toolsPanel;
let $completeBtn;
let $editBtn;
let $deleteBtn;

let $popup; //pobrany popap
let $popupInfo; //alert wpopup jak sie doda pusty tekst
let $editedTodo; //edytowany Todo
let $popupInput; //tekst wpisywany w input w popup'e
let $addPopupBtn; //przycisk zatwierdź w popupi'e
let $closeTodoBtn; // przycisk od zamykania popup'a
let $id = 0;
let $allTask;

const main = () => {
  prepareDOMElements();
  preapereDOMEvents();

};

const addNewTask = () => {
  if ($todoInput.value !== "") {
    $id++;
    $newLi = document.createElement("li");
    $newLi.innerHTML = $todoInput.value;
    // console.log($newTask);
    $newLi.setAttribute("id", `todo-${$id}`);
    $ulList.appendChild($newLi);
    $todoInput.value = "";
    $alertInfo.innerText = "";
    createToolsArea();
  } else {
    $alertInfo.innerText = "Wpisz treść zadania !";
  }
};

const enterCheck = () => {
    if (event.keyCode === 13 ) {
        addNewTask();
    }
};


const createToolsArea = () => {
  $toolsPanel = document.createElement("div");
  $toolsPanel.classList.add("tools");

  $completeBtn = document.createElement("button");
  $completeBtn.classList.add("complete");
  $completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  $editBtn = document.createElement("button");
  $editBtn.classList.add("edit");
  $editBtn.innerHTML = '<i class="fas fa-edit"></i>';

  $deleteBtn = document.createElement("button");
  $deleteBtn.classList.add("delete");
  $deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

  $toolsPanel.appendChild($completeBtn);
  $toolsPanel.appendChild($editBtn);
  $toolsPanel.appendChild($deleteBtn);

  $newLi.appendChild($toolsPanel);

  // console.log($toolsPanel);
};

const editTask = (e) => {
  const oldTodo = e.target.closest("li").id;
  $editedTodo = document.getElementById(oldTodo);
  $popupInput.value = $editedTodo.firstChild.textContent;
  $popup.style.display = "flex";
};

const closePopu = () => {
  $popup.style.display = "none";
  $popupInfo.innerText = "";
};

const changeTodo = () => {
  if ($popupInput.value !== "") {
    $editedTodo.firstChild.textContent = $popupInput.value;
    closePopu();
    $popupInfo.innerText = "";
  } else {
    $popupInfo.innerText = "Pole nie może być puste!";
  }
};

const deleteTask = (e) => {
  const idRemove = e.target.closest("li").id;
  //   console.log(e.target.closest("li").id);
  let taskToRemove = document.getElementById(idRemove);
  // console.log(taskToRemove);
  taskToRemove.remove();

  if ($allTask.length === 0) {
    $alertInfo.innerText = "Brak zadań na liście.";
  }
    // console.log($allTask.length);
};

const checkList = (e) => {
  if (e.target.closest("button").classList.contains("complete")) {

    // console.log(e.target.closest("button").classList.contains("complete"));

    e.target.closest("li").classList.toggle("completed");
   
    e.target.closest("button").classList.toggle("completed");
  
  
} else if (e.target.closest("button").classList.contains("edit")) {
       editTask(e);

} else if (e.target.closest("button").classList.contains("delete")) {
   
     deleteTask(e);
  }
};

const prepareDOMElements = () => {
  $todoInput = document.querySelector(".todoInput");
  $alertInfo = document.querySelector(".alertInfo");
  $addBtn = document.querySelector(".addBtn");
  $ulList = document.querySelector(".todoList ul");

  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popupInfo");
  $popupInput = document.querySelector(".popupInput");
  $addPopupBtn = document.querySelector(".accept");
  $closeTodoBtn = document.querySelector(".cancel");
  $allTask = $ulList.getElementsByTagName("li");
};

const preapereDOMEvents = () => {
  $addBtn.addEventListener("click", addNewTask);
  $ulList.addEventListener("click", checkList);
  $closeTodoBtn.addEventListener("click", closePopu);
  $addPopupBtn.addEventListener("click", changeTodo);
  $closeTodoBtn.addEventListener("click", deleteTask);
  $todoInput.addEventListener('keyup', enterCheck);
};

document.addEventListener("DOMContentLoaded", main);
