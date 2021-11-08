import {gql} from '@apollo/client'

export const CURRENT_USER = gql`
   query {
       me {
           username
           favoriteGenre
       }
   } 
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
            books {
                id
                title
            }
        }
    }
`
export const ALL_BOOKS = gql`
    query allBooks($genre: String){
        allBooks(genre: $genre) {
            id
            title
            author {
                name
            }
            published
            genres
        }
    }
`
export const FILTER_BOOKS = gql`
    query filterBook($genre: String!) {
        allBooks(genre: $genre) {
            id
            title
            author {
                name
            }
            published
            genres
        }
    }
`
export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            id
            title
            author {
                id
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`
export const SET_AUTHOR_BORN = gql`
    mutation setAutrhorBorn($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ){
            id
            name
            born
            bookCount
        }
    }
`
export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username
            password: $password
        ) {
            value
        }
    }
`
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            id
            title
            author {
                id
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`