import Storage from './Storage.js'
import ProjectList from './ProjectList.js'

const newProjectForm = document.querySelector('#new-project-form')
const newTaskForm = document.querySelector('#new-task-form')
const projectNameInput = document.querySelector('#new-project-input')
const taskNameInput = document.querySelector('#new-task-input')
const taskPriorityEle = document.querySelector('#new-task-priority')
const taskDateEle = document.querySelector('#new-task-date')
const projectListContainer = document.querySelector('#project-list')
const projectNameEle = document.querySelector('#project-name')
const tasksContainer = document.querySelector('#tasks')
const tableTasksContainer = document.querySelector('table')
const taskCountEle = document.querySelector('#task-count')
const uncompletetaskCountEle = document.querySelector('#task-count-uncomplete')
const deleteProjectBtn = document.querySelector('#delete-project-btn')
const deleteCompletedTasksBtn = document.querySelector('#delete-completed-tasks-btn')
const projectTaskContainer = document.querySelector('#project-task')
const tasksSortContainer = document.querySelector('#tasks-sort')
const selectTasksSort = document.querySelector('#select-tasks-sort')
const filterTasksContainer = document.querySelector('#tasks-filter')
const filterTasksInput = document.querySelector('#filter-task-input')
const filterTasksDone = document.querySelector('#filter-task-done')
const filterTasksPriority = document.querySelector('#filter-task-priority')
const filterTasksDate = document.querySelector('#filter-task-date')
const filterTasksBtn = document.querySelector('#filter-task-btn')

const projectList = new ProjectList(Storage.getList())
let selectedProjectName = null


newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = projectNameInput.value.trim()
    if (!projectName) {
        return
    }
    projectList.addProject(projectName)
    selectedProjectName = projectName
    projectNameInput.value = ""
    renderLists()
    renderProject()
})
newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = taskNameInput.value.trim()
    if (!taskName || !selectedProjectName) {
        return
    }
    projectList.addTask(selectedProjectName, taskName, taskPriorityEle.value, taskDateEle.value)
    taskNameInput.value = ""
    renderProject()
})
projectListContainer.addEventListener('click', e => {
    const targetEle = e.target
    if (targetEle.classList.contains('list-name')) {
        selectedProjectName = targetEle.textContent
        renderLists()
        renderProject()
    }
})
tasksContainer.addEventListener('click', e => {
    const targetEle = e.target

    if (targetEle.tagName === 'INPUT' && targetEle.type === 'checkbox') {
        projectList.toggleCompleteTask(selectedProjectName, targetEle.value, targetEle.checked)
        renderProject()
    }
})
deleteProjectBtn.addEventListener('click', e => {
    projectList.removeProject(selectedProjectName)
    selectedProjectName = null
    renderLists()
    renderProject()
})
deleteCompletedTasksBtn.addEventListener('click', e => {
    projectList.removeCompletedTasks(selectedProjectName)
    renderProject()
})

selectTasksSort.addEventListener('change', e => {
    if (e.target.value === 'priority') {
        projectList.sortProjectTaskByPriority(selectedProjectName)
        renderProject()
    }
    else if (e.target.value === 'date') {
        projectList.sortProjectTaskByDate(selectedProjectName)
        renderProject()
    }
})
filterTasksBtn.addEventListener('click', e => {
    const project = projectList.getProject(selectedProjectName)
    const tasks = project.filterTasks(filterTasksInput.value, filterTasksDone.value, filterTasksDate.value, filterTasksPriority.value)
    renderTasks(tasks)
})

function renderLists() {
    projectListContainer.replaceChildren()
    for (const project of projectList) {
        const li = document.createElement('li')
        li.textContent = project.name
        if (project.name === selectedProjectName) {
            li.className = 'list-name active-list'
        } else {
            li.className = 'list-name'
        }
        projectListContainer.appendChild(li)
    }
}
function renderProject() {
    const project = projectList.getProject(selectedProjectName)
    if (!project) {
        projectTaskContainer.classList.add('hidden')
        return
    }
    projectTaskContainer.classList.remove('hidden')
    projectNameEle.textContent = project.name
    const numberOfTasks = projectList.getProjectTaskCount(selectedProjectName)
    taskCountEle.textContent = numberOfTasks + ' task'
    uncompletetaskCountEle.textContent = projectList.getProjectUnCompleteTaskCount(selectedProjectName) + ' incomplete tasks'
    if (numberOfTasks === 0) {
        tableTasksContainer.classList.add('hidden')
        tasksSortContainer.classList.add('hidden')
        filterTasksContainer.classList.add('hidden')
        return
    } else {
        tableTasksContainer.classList.remove('hidden')
        tasksSortContainer.classList.remove('hidden')
        filterTasksContainer.classList.remove('hidden')
        renderTasks(project.tasks)
    }
}
function renderTasks(tasks) {
    tasksContainer.replaceChildren()
    for (const task of tasks) {
        tasksContainer.appendChild(createTaskEle(task))
    }
}
function createTaskEle(task) {
    const { title, isDone, priorityText, dueDate } = task

    const taskRow = document.createElement('tr')

    const doneTD = document.createElement('td')
    const titleInput = document.createElement('input')
    titleInput.type = 'checkbox'
    titleInput.id = title
    titleInput.value = title
    titleInput.checked = isDone
    doneTD.appendChild(titleInput)

    const titleTD = document.createElement('td')
    const titleLabel = document.createElement('label')
    titleLabel.textContent = title
    titleLabel.htmlFor = title
    titleTD.appendChild(titleLabel)

    const dateTD = document.createElement('td')
    const dateLabel = document.createElement('label')
    dateLabel.textContent = dueDate
    dateLabel.htmlFor = title
    dateTD.appendChild(dateLabel)

    const priorityTD = document.createElement('td')
    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = priorityText
    priorityLabel.htmlFor = title
    priorityTD.appendChild(priorityLabel)

    taskRow.appendChild(doneTD)
    taskRow.appendChild(titleTD)
    taskRow.appendChild(dateTD)
    taskRow.appendChild(priorityTD)
    return taskRow
}

window.addEventListener('DOMContentLoaded', e => {
    renderLists()
    renderProject()
})
window.addEventListener('beforeunload', e => {
    Storage.saveList(projectList)
})