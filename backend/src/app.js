require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const morgan = require("morgan");
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const googleModel = require("./model/google.model");
const userRoutes = require("./routes/user.routes");
const errorHandler = require('./middlewares/error.middleware');

const app = express();



app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoutes);



// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},async (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  await googleModel.create({
    username: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
  });
    
  // For this example, we'll just return the profile
  return done(null, profile);
}));

// Route to initiate Google OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send the token to the client
   
  }
);

app.use((req,res) => {
    res.status(404).json({message:"internal server error"});
});
app.use(errorHandler);

module.exports = app;