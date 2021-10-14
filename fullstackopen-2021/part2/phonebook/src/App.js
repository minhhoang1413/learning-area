
import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person"
import Notification from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({message:"", type:""})
  useEffect(() => {
    personService.getAll()
      .then(Allperson => {
        setPersons(Allperson)
      })
  },[]);

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewFilter = (event) => setNewFilter(event.target.value);

  const addPhonebook = (event) => {
    event.preventDefault();
    const existName = persons.some(person => person.name === newName); 
    if (existName) {
      let confirm = window.confirm(`${newName} is already add to phonebook, replace the old number with a new one?`);
      if (!confirm) return;
      let updatePersonId = persons.find(person => person.name === newName).id;
      updatePhonebook(updatePersonId);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson));
            setNewName("");
            setNewNumber("");
            setNotification({message:`Added ${newName}` ,  type:"success"})
            setTimeout(() => {
              setNotification(null)
            }, 2000);
          }).catch(error => {
            //console.log(error.response);
            setNotification({message:`${error.response.data.error}` ,  type:"error"})
            setTimeout(() => {
              setNotification(null)
            }, 2000);
          })
    
  }
  const updatePhonebook = (id) => {
    const changePhonebook = {
      name: newName,
      number: newNumber
    }
    personService.update(id,changePhonebook).then(updatedPerson => {
      setPersons(persons.map(person => person.id === id ? updatedPerson : person))
      setNewName("");
      setNewNumber("");
      setNotification({message:`Change ${newName} number` ,  type:"success"});
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    }).catch(error => {
      //console.log(error.response);
      setNotification({message:`${error.response.data.error}` ,  type:"error"})
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    })
  }
  const removePerson = (personDelete) => {
    const confirm = window.confirm(`delete ${personDelete.name} ?`);
    if (!confirm) return; 
    personService.remove(personDelete.id).then(response => {
      //console.log(response);
      setPersons(persons.filter(person => person.id !== personDelete.id));
      setNotification({message:`delete ${personDelete.name} number` ,  type:"success"});
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    }).catch(error => {
      setNotification({message:`${error.message}` ,  type:"error"})
      setTimeout(() => {
        setNotification(null)
      }, 2000);
    })
  }
  const personsFilter = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm addPhonebook={addPhonebook} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsFilter} removePerson={removePerson} />

    </div>
  )
}

export default App