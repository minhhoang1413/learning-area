const express = require('express')
const router = express.Router()

const fileUpload = require('express-fileupload')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
})

const upload = multer({ storage: storage })


const { createProduct, getAllProduct } = require('../controllers/productController')
const { uploadImage, uploadImage2 } = require('../controllers/uploadController')

router.route('/').get(getAllProduct).post(createProduct)
router.route('/upload').post(fileUpload(), uploadImage)
router.route('/upload2').post(upload.single('image'), uploadImage2)
module.exports = router