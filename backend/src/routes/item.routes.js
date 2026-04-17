const express = require('express');
const { createItemController } = require('../controllers/item.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');


const upload = multer({storage: multer.memoryStorage()});
const router = express.Router()

router.post("/create",authMiddleware,upload.single('image'),createItemController);

module.exports = router