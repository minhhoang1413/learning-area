const Author = require('../models/author')
const Book = require('../models/book')
const BookInstance = require('../models/bookinstance')
const Genre = require('../models/genre')

async function index(req, res, next) {
    let bookCount = Book.countDocuments()
    let bookinstanceCount = BookInstance.countDocuments()
    let bookinstanceAvailableCount = BookInstance.countDocuments({ status: "Available" })
    let authorCount = Author.countDocuments()
    let genreCount = Genre.countDocuments()

    try {
        const result = await Promise.all([bookCount, bookinstanceCount, bookinstanceAvailableCount, authorCount, genreCount])
        res.render('index', {
            title: "Local Library Home",
            bookCount: result[0],
            bookinstanceCount: result[1],
            bookinstanceAvailableCount: result[2],
            authorCount: result[3],
            genreCount: result[4]
        })
    } catch (error) {
        next(error)
    }


}

module.exports = { index }