require('dotenv').config();
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const morgan = require("morgan");
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const googleModel = require("./model/google.model");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const errorHandler = require('./middlewares/error.middleware');

const app = express();


app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/items", itemRoutes);



// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/user/auth/google/callback',
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
app.get('/api/v1/user/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
app.get('/api/v1/user/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/profile`);
  }
);

app.use((req,res) => {
    res.status(404).json({message:"OOPS! PAGE not found"});
});
app.use(errorHandler);

module.exports = app;