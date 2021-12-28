const path = require('path')
const { BadRequestError } = require('../errors')
const uploadImage = async (req, res) => {

    if (!req.files) {
        throw new BadRequestError('no file upload')
    }
    let imageUpload = req.files.image
    if (!imageUpload.mimetype.startsWith('image')) {
        throw new BadRequestError('not image')
    }
    const maxSize = 1024 * 1024
    if (imageUpload.size > maxSize) {
        throw new BadRequestError('image too large')
    }
    const imagePath = path.join(__dirname, '../public/uploads/' + imageUpload.name)
    await imageUpload.mv(imagePath)
    res.status(200).json({ image: { src: `/uploads/${imageUpload.name}` } })
}
const uploadImage2 = async (req, res) => {
    console.log(req.file);
    res.status(200).json({ image: { src: req.file.path } })
}

module.exports = { uploadImage, uploadImage2 }