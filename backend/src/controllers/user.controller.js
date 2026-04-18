const jwt = require('jsonwebtoken');
const AppError = require('../utils/error.utils');
const User = require('../model/user.model');
const googleModel = require('../model/google.model');
const bcrypt = require('bcryptjs');



const registerController = async (req, res,next) => {
    const { username, email, password,phoneNo,address,year,department } = req.body;
    console.log(req.body);
    

    if (!username || !email || !password || !phoneNo || !address || !year || !department) {
        return next(new AppError("All fields are required", 400));
    }

    try {
        const existingUser = await User.findOne({email});
       

        if (existingUser) {
            return next(new AppError("User with this email or username already exists", 409));
        }

        const existingGoogleUser = await googleModel.findOne({ email: email });

        if (existingGoogleUser) {
            return next(new AppError("User with this email already exists", 409));
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await  User.create({
            username,
            email,
            password: hashpassword,
            phoneNo,
            address,
            year,
            department
        });

        const token = jwt.sign({ 
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
         }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        newUser.password = undefined;
        res.status(201).json({
            success: true,
            message:"User registered successfully",
            token,
            user: newUser
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

const loginController = async (req, res,next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
    }

    try {
        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            return next(new AppError("Invalid email or password", 401));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new AppError("Invalid email or password", 401));
        }

        const token = await jwt.sign({ 
            id: user._id,
            username: user.username,
            email: user.email
         }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
      return  next(new AppError(error.message, 500));
    }
   
}

const profileController = async (req, res,next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            user
        });
    } catch (error) {      
          next(new AppError(error.message, 500));
    }
}
const logoutController = async (req, res,next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}



module.exports = {
    registerController,
    loginController,
    profileController,
    logoutController
}