import React, {useState} from "react";

const Anecdote = ({title, anecdoteObj}) => (
  <div>
      <h2>{title}</h2>
      <p>{anecdoteObj.anecdote}</p>
      <p>has {anecdoteObj.vote} {anecdoteObj.vote > 1 ? "votes" : "vote"}</p>
  </div>
)
function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const nextAnecdote = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const voteAnecdote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  const getAnecdote = () => ({anecdote: anecdotes[selected],vote:votes[selected]})
  const getMostVote= () => {
   const mostVote= votes.reduce((obj,currentValue,currentIndex)=> {
      if(obj.value < currentValue){
        obj.value = currentValue;
        obj.index = currentIndex;
      }
      return obj;
    },{value:votes[0], index:0})
    return {anecdote: anecdotes[mostVote.index], vote:mostVote.value}
  }
  return (
    <div className="">
      <Anecdote title="Anecdote of the day" anecdoteObj={getAnecdote()} />
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <Anecdote title="Anecdote with most vote" anecdoteObj={getMostVote()} />
    </div>
  );
}

export default App;
