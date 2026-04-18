const express = require('express');
const passport = require('passport');
const {
  googleAuthCallback,
  googleAuthInitiate,
  getGoogleUserProfile,
  googleLogout,
} = require('../controllers/google.controller');

const router = express.Router();

// Initiate Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: false,
  }),
  googleAuthCallback
);

// Get Google user profile
router.get('/profile', getGoogleUserProfile);

// Logout
router.post('/logout', googleLogout);

module.exports = router;
