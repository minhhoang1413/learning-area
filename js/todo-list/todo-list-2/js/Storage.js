class Storage {
    static LOCAL_STORAGE_LIST_KEY = 'todo.list'
    static getList() {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_LIST_KEY)) 
    }
  
    static saveList(list) {
        localStorage.setItem(this.LOCAL_STORAGE_LIST_KEY, JSON.stringify(list))
    }
}

export default Storage