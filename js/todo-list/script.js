const listsContainer = document.querySelector(".task-list");
const newListForm = document.querySelector(".new-list-form");
const newTaskForm = document.querySelector(".new-task-form");
const newListInput = document.querySelector(".new-list");
const newTaskInput = document.querySelector(".new-task");
const deleteList = document.querySelector(".delete-list");
const deleteCompleteTask = document.querySelector(".delete-complete-task");
const listDisplayContainer = document.querySelector('.todo-list');
const listTitleElement = document.querySelector(".todo-title");
const listCountElement = document.querySelector(".todo-task-count");
const tasksContainer = document.querySelector(".tasks");
const taskTemplate = document.querySelector("#task-template");
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
render();

listsContainer.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        selectedListId = e.target.getAttribute("data-list-id");
        saveAndRenderList();
    }
});
tasksContainer.addEventListener("click", e => {
    //console.log(e.target);return;
    if (e.target.tagName === "INPUT") {
        let selectedList = lists.find(list => list.id === selectedListId);
        let selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        saveList();
        renderTasksCount(selectedList);
    }
});
newListForm.addEventListener("submit", e => {
    e.preventDefault();
    let inputName = newListInput.value;
    if (inputName.trim() == "") return;
    let newList = createList(inputName);
    lists.push(newList);
    newListInput.value = "";
    saveAndRenderList();
    // clearChildElement(listsContainer);
    // saveList();
    // renderLists();
});
newTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    let inputName = newTaskInput.value;
    if (inputName.trim() == "") return;
    let newTask = createTask(inputName);
    //console.log(newTask);
    let selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(newTask);
    newTaskInput.value = "";
    saveAndRenderList();
    // saveList();
    // renderTasksCount(selectedList);
    // clearChildElement(tasksContainer);
    // renderTasks(selectedList);
});
deleteList.addEventListener("click", e => {
    lists = lists.filter(list => {
        return list.id != selectedListId;
    });
    selectedListId = "";
    saveAndRenderList();
});
deleteCompleteTask.addEventListener("click", e => {
    
    let selectedList = lists.find(list => {
        return list.id === selectedListId;
    });    
    selectedList.tasks = selectedList.tasks.filter(task => {
       return task.complete === false;
    });  
    saveAndRenderList();
    // saveList();
    // renderTasksCount(selectedList);
    // clearChildElement(tasksContainer);
    // renderTasks(selectedList);
});
function createTask(name) {
    return {
        id: Date.now().toString(),
        name: name,
        complete: false
    }
}
function createList(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    };
}
function saveAndRenderList() {
    saveList();
    render();

}
function renderTasksCount(selectedList) {
    let taskRemainCount = selectedList.tasks.filter(task => task.complete === false).length;
    listCountElement.textContent = taskRemainCount + " " + (taskRemainCount === 1 ? "task" : "tasks") + " remaining";
}
function saveList() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}
function render() {
    clearChildElement(listsContainer);
    renderLists();
    if (selectedListId) {
        listDisplayContainer.style.display = "";
        let selectedList = lists.find(list => list.id === selectedListId);
        listTitleElement.textContent = selectedList.name;
        renderTasksCount(selectedList);
        clearChildElement(tasksContainer);
        renderTasks(selectedList);
    } else {
        listDisplayContainer.style.display = "none";
    }
}
function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        let taskElement = taskTemplate.content.cloneNode(true);
        let checkboxEle = taskElement.querySelector("input");
        let label = taskElement.querySelector("label");
        checkboxEle.id = task.id;
        checkboxEle.checked = task.complete;
        label.setAttribute("for", task.id);
        label.textContent = task.name;
        tasksContainer.appendChild(taskElement);
    });
}
function renderLists() {
    lists.forEach(item => {
        let listElement = document.createElement("li");
        listElement.className = "list-name";
        listElement.setAttribute("data-list-id", item.id);
        listElement.textContent = item.name;
        if (item.id === selectedListId) {
            listElement.className = "list-name active-list";
        }
        listsContainer.appendChild(listElement);
    });
}
function clearChildElement(element) {
    //element.replaceChildren();
    while (element.firstChild) {
        element.firstChild.remove();
    }
}