import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
// import anecdoteService from './services/anecdotes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {initialAnecdote} from './reducers/anecdoteReducer'
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initialAnecdote())
  },[])
  
  return (
    <div className="App">
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;
