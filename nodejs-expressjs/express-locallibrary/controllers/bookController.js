const Book = require('../models/book')
const Genre = require('../models/genre')
const Author = require('../models/author')
const BookInstance = require('../models/bookinstance')

async function getAll(req, res, next) {
    try {
        const books = await Book.find({}, "title author")
            .sort({ title: 1 })
            .populate('author')
            .exec()
        res.render('books', { title: "Book List", books })
    } catch (error) {
        next(error)
    }
}
async function getDetailBook(req, res, next) {
    const id = req.params.id
    try {
        const book = await Book.findById(id).populate('author').populate('genre')
        if (!book) {
            throw new Error('book not found')
        }
        const bookinstances = await BookInstance.find({ book: id })
        console.log(book);
        // console.log(bookinstances);
        res.render('book-detail', { title: `Book: ${book.title}`, book, bookinstances })
    } catch (error) {
        next(error)
    }
}
async function viewCreateBook(req, res, next) {
    try {
        const [genres, authors] = await Promise.all([Genre.find(), Author.find()])
        res.render('book-create', { title: 'Create book', genres, authors, old: null, error: null })
    } catch (error) {
        next(error)
    }
}
async function createBook(req, res, next) {
    const author = req.body.author
    const title = req.body.title.trim()
    const isbn = req.body.isbn.trim()
    const summary = req.body.summary.trim()
    const genre = Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre]
    const old = { title, isbn, summary, genre, author }
    let error = []
    try {
        if (!title || !isbn || !summary || !genre || !author) {
            error.push('all fields are required')
        }
        const existedAuthor = await Author.findById(author)
        if (!existedAuthor) {
            error.push('author is not exist')
        }
        for (const genreId of genre) {
            const existedGenre = await Genre.findById(genreId)
            if (!existedGenre) {
                error.push('genre is not exist ')
            }
        }
        if (error.length > 0) {
            const [genres, authors] = await Promise.all([Genre.find(), Author.find()])
            return res.render('book-create', { title: 'Create book', genres, authors, old, error: error.join(', ') })
        }
        const book = await Book.create({ ...old })
        res.redirect(book.url)
    } catch (error) {
        next(error)
    }
}
async function viewUpdateBook(req, res, next) {
    const id = req.params.id
    try {
        const book = await Book.findById(id)
        if (!book) {
            throw new Error('Book not found')
        }
        const [authors, genres] = await Promise.all([Author.find(), Genre.find()])
        res.render('book-create', { title: 'Update book' + book.title, old: book, genres, authors, error: null })
    } catch (error) {
        next(error)
    }
}
async function updateBook(req, res, next) {
    const id = req.params.id
    const author = req.body.author
    const title = req.body.title.trim()
    const isbn = req.body.isbn.trim()
    const summary = req.body.summary.trim()
    const genre = Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre]
    const old = { title, isbn, summary, genre, author }
    let error = []
    try {
        if (!title || !isbn || !summary || !genre || !author) {
            error.push('all fields are required')
        }
        const existedAuthor = await Author.findById(author)
        if (!existedAuthor) {
            error.push('author is not exist')
        }
        for (const genreId of genre) {
            const existedGenre = await Genre.findById(genreId)
            if (!existedGenre) {
                error.push('genre is not exist ')
            }
        }
        if (error.length > 0) {
            const [genres, authors] = await Promise.all([Genre.find(), Author.find()])
            return res.render('book-create', { title: 'Update book', genres, authors, old, error: error.join(', ') })
        }
        const updatedBook = await Book.findByIdAndUpdate(id, { ...old })
        res.redirect(updatedBook.url)
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getDetailBook, viewCreateBook, createBook, viewUpdateBook, updateBook }