const Author = require('../models/author')
const Book = require('../models/book')

async function getAll(req, res, next) {
    try {
        const authors = await Author.find().sort({ 'last_name': 1 }).exec()
        res.render('authors', { title: 'Author List', authors })
    } catch (error) {
        next(error)
    }
}
async function getAuthorDetail(req, res, next) {
    try {
        const authorId = req.params.id
        const author = await Author.findById(authorId)
        if (!author) {
            throw new Error('no author found')
        }
        const books = await Book.find({ author: authorId })
        res.render('author-detail', { title: `Author: ${author.fullname}`, author, books })
    } catch (error) {
        next(error)
    }
}
function viewCreateAuthor(req, res) {
    res.render('author-create', { title: 'Create Author', old: null, error: null })
}
async function createAuthor(req, res) {
    const old = req.body
    try {
        const existed = await Author.findOne({ ...old })
        if (existed) {
            throw new Error('author has already existed')
        }
        const author = await Author.create({ ...old })
        res.redirect(author.url)
    } catch (error) {
        res.render('author-create', { title: 'Create Author', old, error: error.message })
    }
}
async function viewDeleteAuthor(req, res, next) {
    try {
        const author = await Author.findById(req.params.id)
        if (!author) {
            return res.redirect('/authors')
        }
        const books = await Book.find({ author: req.params.id })
        const title = `Delete author ${author.fullname}`
        if (books.length > 0) {
            return res.render('author-delete', { title, canDelete: false, msg: 'You can not delete this author' })
        }
        return res.render('author-delete', { title, canDelete: true, msg: 'Do you really want to delete this author?' })
    } catch (error) {
        next(error)
    }
}
async function deleteAuthor(req, res, next) {
    try {
        const author = await Author.findById(req.params.id)
        if (!author) {
            throw new Error('Author not found')
        }
        const books = await Book.find({ author: req.params.id })
        if (books.length > 0) {
            throw new Error('Can not delete this author')
        }
        await author.deleteOne()
        res.redirect('/authors')
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getAuthorDetail, viewCreateAuthor, createAuthor, viewDeleteAuthor, deleteAuthor }