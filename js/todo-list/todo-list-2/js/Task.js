class Task {
    #title
    #dueDate
    #priority
    #isDone
    static priorityText = {
        0: 'Low',
        1: 'Medium',
        2: 'High'
    }
    constructor(title, isDone = false, priority = 0, dueDate = null) {
        this.#title = title
        this.#dueDate = dueDate
        this.#priority = Number(priority)
        this.#isDone = isDone
    }
    get title() {
        return this.#title
    }
    get dueDate() {
        return this.#dueDate
    }
    get priority() {
        return this.#priority
    }
    get priorityText() {
        return Task.priorityText[this.#priority]
    }
    get isDone() {
        return this.#isDone
    }
    set isDone(value) {
        this.#isDone = value
    }
    toJSON() {
        return {
            title: this.title,
            isDone: this.isDone,
            priority: this.priority,
            dueDate: this.dueDate
        }
    }
}

export default Task