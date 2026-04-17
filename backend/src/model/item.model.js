const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [5, 'Title must be at least 5 characters long'],
    maxLength: [50, 'Title cannot exceed 50 characters'],
    trim: true,
  }
  ,
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [10, 'Description must be at least 10 characters long'],
    maxLength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  category: {
    type: String,
    enum: ["Books", "Electronics", "Clothing", "Furniture", "Stationery", "Other"],
    required: [true, 'Category is required']
  },

  condition: {
    type: String,
    enum: ["A", "B", "C"],
    required: [true, 'Condition is required']
  },

  images:{
    type: String,
    required: [true, 'Image URL is required']
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["available", "reserved", "sold"],
    default: "available"
  },

  verified: { type: Boolean, default: false }

}, {timestamps:true});

const Item = mongoose.model('Hac_project_Item', itemSchema);


module.exports = Item;