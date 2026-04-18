const jwt = require('jsonwebtoken');
const AppError = require('../utils/error.utils');
const googleModel = require('../model/google.model');

// Handle Google OAuth callback
const googleAuthCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AppError('Authentication failed', 401));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '7d',
      }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend with token
    res.redirect(
      `http://localhost:5173/auth/google/callback?token=${token}&user=${JSON.stringify(
        req.user
      )}`
    );
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// Initiate Google OAuth flow
const googleAuthInitiate = (req, res) => {
  // This is handled by passport middleware
  // No implementation needed here as passport handles the redirect
};

// Get authenticated user profile
const getGoogleUserProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new AppError('No token provided', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await googleModel.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new AppError(error.message, 401));
  }
};

// Logout Google user
const googleLogout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  googleAuthCallback,
  googleAuthInitiate,
  getGoogleUserProfile,
  googleLogout,
};
