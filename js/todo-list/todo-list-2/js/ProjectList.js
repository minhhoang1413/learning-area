import Project from "./Project.js"

class ProjectList {
    projects
    constructor(projectList) {
        this.projects = []
        if (!projectList) {
            return
        }
        const { projects } = projectList
        if (!Array.isArray(projects)) return
        for (const project of projects) {
            this.addProject(project.name, project.tasks)
        }
    }

    indexOfProject(name) {
        return this.projects.findIndex(project => project.name === name)
    }
    getProject(name) {
        return this.projects[this.indexOfProject(name)]
    }

    containProject(name) {
        if (this.projects.length === 0) {
            return false
        }
        return this.indexOfProject(name) !== -1
    }
    addProject(projectName, projectTasks) {
        if (this.containProject(projectName)) {
            return
        }
        const newProject = new Project(projectName, projectTasks)
        this.projects.push(newProject)
    }
    removeProject(name) {
        const index = this.indexOfProject(name)
        if (index !== -1) {
            this.projects.splice(index, 1)
        }
    }
    removeCompletedTasks(project) {
        this.getProject(project).removeCompletedTasks()
    }
    addTask(projectName, taskTitle, taskPriority, taskDate) {
        this.getProject(projectName).addTask(taskTitle, taskPriority, taskDate)
    }
    toggleCompleteTask(projectName, taskTitle, value) {
        this.getProject(projectName).getTask(taskTitle).isDone = value
    }
    getProjectTaskCount(projectName) {
        return this.getProject(projectName).getTaskCount()
    }
    getProjectUnCompleteTaskCount(projectName) {
        return this.getProject(projectName).getUncompleteTaskCount()
    }
    sortProjectTaskByPriority(projectName) {
        this.getProject(projectName).sortByPriority()
    }
    sortProjectTaskByDate(projectName) {
        this.getProject(projectName).sortByDate()
    }
    [Symbol.iterator]() {
        let index = 0
        return {
            next: () => {
                if (index < this.projects.length) {
                    return { value: this.projects[index++], done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
}
export default ProjectList