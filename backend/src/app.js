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
const googleRoutes = require("./routes/google.routes");
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    
    // Try to find existing user
    let user = await googleModel.findOne({ googleId: profile.id });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await googleModel.create({
        username: profile.displayName,
        email: email,
        googleId: profile.id,
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await googleModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/auth", googleRoutes);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: "OOPS! PAGE not found" });
});
app.use(errorHandler);

module.exports = app;