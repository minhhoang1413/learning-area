
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, BOOK_ADDED } from './queries'
import { ALL_BOOKS, CURRENT_USER } from "./queries"
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const allBooks = useQuery(ALL_BOOKS)
  const allAuthors = useQuery(ALL_AUTHORS)
  const currentUser = useQuery(CURRENT_USER)
  // const resultAllBooks = useQuery(ALL_BOOKS)
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const bookAdded = subscriptionData.data.bookAdded
      updateCacheWith(bookAdded)
      window.alert('new book added: '+ bookAdded.title)
    }
  })
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        

      </div>

      <Authors
        show={page === 'authors'} allAuthors={allAuthors}
      />

      <Books
        show={page === 'books'} allBooks={allBooks}
      />
      <Recommend
        show={page === 'recommend'} currentUser={currentUser}
      />
      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />
      <LoginForm setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App