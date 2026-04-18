const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [5, 'Title must be at least 5 characters long'],
    maxLength: [100, 'Title cannot exceed 100 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [20, 'Description must be at least 20 characters long'],
    maxLength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  condition: {
    type: String,
    enum: ["like-new", "excellent", "good", "fair"],
    required: [true, 'Condition is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hac_project_User"
  },
  status: {
    type: String,
    enum: ["available", "reserved", "sold"],
    default: "available"
  },
  verified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Item = mongoose.model('Hac_project_Item', itemSchema);

module.exports = Item;