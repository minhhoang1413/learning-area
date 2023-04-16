const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')

async function getAll(req, res, next) {
    try {
        const bookInstances = await BookInstance.find({})
            .populate('book')
            .exec()
        res.render('book-instance-list', { title: "Book Instance List", bookInstances })
    } catch (error) {
        next(error)
    }
}
async function getDetailInstance(req, res, next) {
    try {
        const id = req.params.id
        const bookInstance = await BookInstance.findById(id).populate('book')
        if (!bookInstance) {
            throw new Error('not book instance with id')
        }
        res.render('book-instance-detail', { title: `Copy: ${bookInstance.book.title}`, bookInstance })
    } catch (error) {
        next(error)
    }
}
async function viewCreateBookInstance(req, res, next) {
    try {
        const books = await Book.find()
        res.render('book-instance-create', { title: "Create book instance", books, old: null, error: null })
    } catch (error) {
        next(error)
    }
}
async function createBookInstance(req, res, next) {
    const book = req.body.book
    const imprint = req.body.imprint
    const status = req.body.status
    const due_back = req.body.due_back
    const old = req.body
    const error = []
    try {
        if (!book || !imprint || !status || !due_back) {
            error.push('all fields are required')
        }
        if (!["Available", "Maintenance", "Loaned", "Reserved"].includes(status)) {
            error.push('status not exist')
        }
        if (new Date(due_back) === 'Invalid Date' || isNaN(new Date(due_back))) {
            error.push('date error')
        }
        const existBook = await Book.findById(book)
        if (!existBook) {
            error.push('book not exist')
        }
        if (error.length > 0) {
            const books = await Book.find()
            return res.render('book-instance-create', { title: 'create instance book', books, old, error: error.join(', ') })
        }
        const bookInstance = await BookInstance.create({ ...old })
        res.redirect(bookInstance.url)
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getDetailInstance, viewCreateBookInstance, createBookInstance }