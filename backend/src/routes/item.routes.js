const express = require('express');
const {
  createItemController,
  getItemsController,
  getItemByIdController,
  getUserItemsController,
  updateItemStatusController,
  deleteItemController,
  updateItemController
} = require('../controllers/item.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Public routes
router.get("/", getItemsController);
router.get("/:id", getItemByIdController);

// Protected routes (require authentication)
router.post("/create", authMiddleware, upload.single('image'), createItemController);
router.get("/user/items", authMiddleware, getUserItemsController);
router.patch("/:id/status", authMiddleware, updateItemStatusController);
router.patch("/:id", authMiddleware, updateItemController);
router.delete("/:id", authMiddleware, deleteItemController);

module.exports = router;