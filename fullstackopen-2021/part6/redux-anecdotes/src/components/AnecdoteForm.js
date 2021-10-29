import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch, connect } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
// import anecdoteService from "../services/anecdotes"
const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
       // const newAnecdote = await anecdoteService.createNew(content)
       props.createAnecdote(content) // dispatch(createAnecdote(content))
       props.createNotification(`Add ${content}`) // dispatch(createNotification('Add '+content))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
const mapDispatchToProps = {
    createAnecdote,
    createNotification
}
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)