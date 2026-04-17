const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const AppError = require("../utils/error.utils");



const authMiddleware = (req, res, next) => {

    const {token} = req.cookies;
    //console.log(token);
    
    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return next(new AppError("Unauthorized", 401));
        }
        
        req.user = decoded;
        next();

        
    } catch (error) {
        return next(new AppError("Invalid token", 401));
    }

}

module.exports = authMiddleware;