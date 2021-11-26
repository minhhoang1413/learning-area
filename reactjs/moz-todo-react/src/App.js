/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, useRef } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { usePrevious } from "./hooks/usePrevious";
import { useEffect } from "react/cjs/react.development";
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)
function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length)

  useEffect(()=>{
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  },[tasks.length,prevTaskLength])
  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks(tasks.concat(newTask))
  }
  const toggleTaskCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task,completed:!task.completed} : task))
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const editTask = (id, newName) => {
    setTasks(tasks.map(task => task.id === id ? {...task,name: newName} : task))
  }
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task =>
    <Todo key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask} 
      editTask={editTask} />
  )
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
  ))
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {tasks.length !== 1 ? tasks.length + ' tasks' : tasks.length + ' task'} remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
