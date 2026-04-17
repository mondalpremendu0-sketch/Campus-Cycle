const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], 
        unique: [true, 'Username must be unique']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }, 
    phoneNo: {
        type: Number,
        required: [true, 'Phone number is required'], 
        unique: [true, 'Phone number must be unique']
    },
    department: {
        type: String,
        // required: [true, 'Department is required']  
        },
    address: { 
        type: String,
        
        required: [true, 'Address is required']
     },
    year: {
        type: Number,
        required: [true, 'Year is required']
        },
    role:{
        type: String,
        enum: ['seller', 'buyer'],
        required: [true, 'Role is required'],
        default: 'buyer'
    }


});

const User = mongoose.model('Hac_project_User', userSchema);


module.exports = User;