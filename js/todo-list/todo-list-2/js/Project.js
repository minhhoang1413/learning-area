import Task from './Task.js'

class Project {
    #name
    #tasks
    constructor(name, tasks) {
        this.#name = name
        this.#tasks = []
        if (!Array.isArray(tasks)) return
        for (const task of tasks) {
            this.addTask(task.title, task.priority, task.dueDate, task.isDone)
        }
    }
    get name() {
        return this.#name
    }
    get tasks() {
        return [...this.#tasks]
    }
    filterTasks(title, isDone, date, priority) {
        if (isDone) {
            isDone = isDone === 'true' ? true : false
        }
        if (priority) {
            priority = Number(priority)
        }
        return this.#tasks.filter(task => {
            let bool = true
            if (title) {
                bool = bool && task.title.includes(title)
            }
            if (isDone) {
                bool = bool && task.isDone === isDone
            }
            if (date) {
                bool = bool && task.dueDate === date
            }
            if (priority || priority === 0) {
                bool = bool && (task.priority === priority)
            }
            return bool
        })
    }
    getTaskCount() {
        return this.#tasks.length
    }
    getUncompleteTaskCount() {
        let count = 0
        for (const task of this.#tasks) {
            if (!task.isDone) count++
        }
        return count
    }
    indexOfTask(title) {
        return this.#tasks.findIndex(task => task.title === title)
    }
    getTask(title) {
        return this.#tasks[this.indexOfTask(title)]
    }
    containTask(title) {
        return this.indexOfTask(title) !== -1
    }
    addTask(taskTitle, priority, dueDate, isDone) {
        if (this.containTask(taskTitle)) {
            return
        }
        const task = new Task(taskTitle, isDone, priority, dueDate)
        this.#tasks.push(task)
    }
    removeTask(title) {
        const index = this.indexOfTask(title)
        if (index !== -1) {
            this.#tasks.splice(index, 1)
        }
    }
    removeCompletedTasks() {
        this.#tasks = this.#tasks.filter(task => !task.isDone)
    }
    sortByPriority() {
        this.#tasks.sort((t1, t2) => {
            return t2.priority - t1.priority
        })
    }
    sortByDate() {
        this.#tasks.sort((t1, t2) => {
            return t1.dueDate.localeCompare(t2.dueDate)
        })
    }
    [Symbol.iterator]() {
        let index = 0
        return {
            next: () => {
                if (index < this.#tasks.length) {
                    return { value: this.#tasks[index++], done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
    toJSON() {
        return { name: this.name, tasks: this.#tasks }
    }
}
export default Project