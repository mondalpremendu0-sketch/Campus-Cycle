const AppError = require('../utils/error.utils');
const Item = require('../model/item.model');
const { uploadFile } = require('../services/imagekit.service');
const { nanoid } = require('nanoid');

const createItemController = async (req, res, next) => {
  const { title, description, price, condition, location, contactPhone } = req.body;
  const imageFile = req.file;

  if (!title || !description || !price || !condition || !location || !contactPhone) {
    return next(new AppError("All fields are required", 400));
  }

  if (!imageFile) {
    return next(new AppError("Image is required", 400));
  }

  const user = req.user;
  try {
    const imgString = imageFile.buffer.toString('base64');
    const imgUrl = await uploadFile(imgString, `item-${nanoid()}`);

    const newItem = await Item.create({
      title,
      description,
      price,
      condition,
      location,
      contactPhone,
      image: imgUrl,
      seller: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to create item", 500));
  }
};

// Get all available items (public browse)
const getItemsController = async (req, res, next) => {
  try {
    const { search, condition, minPrice, maxPrice, location, page = 1, limit = 12 } = req.query;
    
    // Build filter object
    const filter = { status: 'available' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (condition) {
      filter.condition = condition;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    let items = await Item.find(filter)
      .populate('seller', 'username email phoneNo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Handle items with unpopulated sellers (from Google users)
    const googleModel = require('../model/google.model');
    items = await Promise.all(items.map(async (item) => {
      if (item.seller === null || (item.seller && !item.seller.username)) {
        const googleUser = await googleModel.findById(item._doc?.seller || item.seller);
        if (googleUser) {
          item.seller = {
            _id: googleUser._id,
            username: googleUser.username,
            email: googleUser.email,
            phoneNo: googleUser.phoneNo || 'N/A'
          };
        }
      }
      return item;
    }));
    
    const total = await Item.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      items,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to fetch items", 500));
  }
};

// Get single item details
const getItemByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const item = await Item.findById(id);
    
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    
    // Try to populate seller from User model first
    let populatedItem = await Item.findById(id)
      .populate('seller', 'username email phoneNo address');
    
    // If seller is not populated (Google user), get from googleModel
    if (populatedItem && !populatedItem.seller) {
      const googleModel = require('../model/google.model');
      const googleUser = await googleModel.findById(item.seller);
      if (googleUser) {
        populatedItem.seller = {
          _id: googleUser._id,
          username: googleUser.username,
          email: googleUser.email,
          phoneNo: googleUser.phoneNo || 'N/A',
          address: 'Campus'
        };
      }
    }
    
    res.status(200).json({
      success: true,
      item: populatedItem
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to fetch item", 500));
  }
};

// Get user's items
const getUserItemsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await Item.find({ seller: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to fetch user items", 500));
  }
};

// Update item status
const updateItemStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    
    if (!['available', 'reserved', 'sold'].includes(status)) {
      return next(new AppError("Invalid status", 400));
    }
    
    const item = await Item.findById(id);
    
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    
    // Check if user is the seller
    if (item.seller.toString() !== userId) {
      return next(new AppError("You can only update your own items", 403));
    }
    
    item.status = status;
    await item.save();
    
    res.status(200).json({
      success: true,
      message: "Item status updated successfully",
      item
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to update item", 500));
  }
};

// Delete item
const deleteItemController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const item = await Item.findById(id);
    
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    
    // Check if user is the seller
    if (item.seller.toString() !== userId) {
      return next(new AppError("You can only delete your own items", 403));
    }
    
    await Item.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to delete item", 500));
  }
};

// Update item details
const updateItemController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, price, condition, location, contactPhone } = req.body;
    
    const item = await Item.findById(id);
    
    if (!item) {
      return next(new AppError("Item not found", 404));
    }
    
    // Check if user is the seller
    if (item.seller.toString() !== userId) {
      return next(new AppError("You can only update your own items", 403));
    }
    
    // Update fields
    if (title) item.title = title;
    if (description) item.description = description;
    if (price) item.price = price;
    if (condition) item.condition = condition;
    if (location) item.location = location;
    if (contactPhone) item.contactPhone = contactPhone;
    
    await item.save();
    
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item
    });
  } catch (err) {
    return next(new AppError(err.message || "Failed to update item", 500));
  }
};

module.exports = {
  createItemController,
  getItemsController,
  getItemByIdController,
  getUserItemsController,
  updateItemStatusController,
  deleteItemController,
  updateItemController
};
