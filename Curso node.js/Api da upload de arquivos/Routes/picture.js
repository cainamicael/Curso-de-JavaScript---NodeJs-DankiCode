const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const pictureController = require('../controllers/pictureController')

router.post('/', upload.single('file'), pictureController.create)//O campo file é o name do input
router.get('/', pictureController.findall)
router.delete('/:id', pictureController.remove)

module.exports = router
