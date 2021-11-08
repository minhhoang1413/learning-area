
import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

import { ALL_BOOKS } from "../queries"
const Recommend = (props) => {
    
    const [books, setBooks] = useState([])

    const [filterBook, resultFilterBooks] = useLazyQuery(ALL_BOOKS,{
        onCompleted: (data) => {
            console.log('on complete',data)
            //setBooks(data.allBooks)
        },
        onError: (error) => console.log('error',error)
    })
    useEffect(() => {
        if (props.show) {
            console.log('effect recommend');
            filterBook({ variables: { genre: props.currentUser.data.me.favoriteGenre } })
        }
    }, [props.show])
    useEffect(() => {
        console.log('before effect data');
        if (resultFilterBooks.data) {
            console.log('effect data', resultFilterBooks);
            setBooks(resultFilterBooks.data.allBooks)
        }
    }, [resultFilterBooks])
    if (!props.show) {
        return null
    }
    console.log(' before resultFilterBooks', resultFilterBooks);
    if (!resultFilterBooks.called) {
        return <div>loading...</div>
    }
    if (resultFilterBooks.loading) {
        return <div>loading...</div>
    }
    
    
    //const books = props.allBooks.data.allBooks

    //const booksToShow =  books.filter(book => book.genres.includes(currentUser.data.me.favoriteGenre))
    console.log('user', props.currentUser);
    console.log(' after resultFilterBooks', resultFilterBooks);
    console.log('books', books);
    //console.log('book show',booksToShow);
    // return null;
    return (
        <div>
            <h2>Recommend</h2>
            <p>books in your favorite genre {props.currentUser.data.me.favoriteGenre}</p>
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
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend