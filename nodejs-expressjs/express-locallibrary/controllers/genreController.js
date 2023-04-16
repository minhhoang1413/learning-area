const Genre = require('../models/genre')
const Book = require('../models/book')

async function getAll(req, res, next) {
    try {
        const genres = await Genre.find({}).exec()
        res.render('genres', { title: "Genre List", genres })
    } catch (error) {
        next(error)
    }
}
async function getBookInGenre(req, res, next) {
    try {
        const id = req.params.id
        const [genre, books] = await Promise.all([Genre.findById(id), Book.find({ genre: id })])
        if (!genre) {
            throw new Error('genre not found')
        }
        res.render('genre-detail', { title: `Genre: ${genre.name}`, books })
    } catch (error) {
        next(error)
    }
}
function viewCreateGenrePage(req, res) {
    res.render('genre-create', { title: 'Create genre', old: null, error: null })
}
async function createGenre(req, res) {
    const name = req.body.name.trim()
    const old = { name }
    try {
        if (!name) {
            throw new Error('genre name must not empty')
        }
        const existingGenre = await Genre.findOne({ name })
        if (existingGenre) {
            console.log(existingGenre);
            throw new Error('genre has already existed')
        }
        const genre = await Genre.create({ name })
        res.redirect(genre.url)
    } catch (error) {
        return res.render('genre-create', { title: 'Create genre', old, error: error.message })
    }
}
module.exports = { getAll, getBookInGenre, viewCreateGenrePage, createGenre }