import { useState, useEffect } from "react";

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return { type, value, onChange }
}
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(()=>{
    console.log('useEffect',baseUrl);
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => setResources(data))

  },[])
  const create = async (newObject) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObject)
    }
    const response = await fetch(baseUrl, config)
    const createdObject = await response.json()
    setResources(resources.concat(createdObject))
  }
  const service = {  create }

  return [resources, service]
}
function App() {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    //notes = notes.concat(newNote)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }
  //console.log('render');
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App;
