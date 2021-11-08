import {  useMutation, useQuery } from "@apollo/client"
import { SET_AUTHOR_BORN } from '../queries'

const Authors = (props) => {
  const result = props.allAuthors

  const [editAuthor] = useMutation(SET_AUTHOR_BORN,{
    onError: (error) => {
      console.log(error);
    }
  })
  const handleAuthorForm = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const setBornTo = Number(event.target.born.value)
    console.log(name, setBornTo);
    editAuthor({variables: {name, setBornTo}})
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.book ? a.book.length : a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleAuthorForm}>
        {/* <div>name: <input name="name" /></div> */}
        <select name="name">
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>  
          )}
        </select>
        <div>born: <input name="born" /></div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default Authors