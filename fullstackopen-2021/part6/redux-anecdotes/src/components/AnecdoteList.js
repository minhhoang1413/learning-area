import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'
const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filterString = state.filter.toLowerCase()
        return state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(filterString))
            .sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`you vote  + ${anecdote.content}`,5))
        //setTimeout(() => dispatch(clearNotification()), 5000)
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote}
                    handleClick={() => vote(anecdote)} />
            )}
        </div>
    )
}
export default AnecdoteList