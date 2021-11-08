import { useQuery } from "@apollo/client"
import { useState } from "react/cjs/react.development"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = props.allBooks
  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = books.reduce((arrayResult, currentBook) => {
    const currentGenre = currentBook.genres
    currentGenre.forEach(genre => {
      if (!arrayResult.includes(genre)) {
        arrayResult = arrayResult.concat(genre)
      }
    })
    return arrayResult
  }, [])
  const booksToShow = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books
  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <p>in genre {selectedGenre}</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button onClick={() => setSelectedGenre(genre)} key={genre}>{genre}</button>
        )}
      </div>
    </div>
  )
}

export default Books