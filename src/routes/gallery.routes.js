let express = require('express')
const { addGallery } = require('../controllers/gallery.controller')
let router = express.Router()


router.post('/addgallery',addGallery)


module.exports = router