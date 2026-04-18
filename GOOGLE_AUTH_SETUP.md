# Google OAuth 2.0 Integration Guide

## Overview

This document describes the Google OAuth 2.0 authentication system implemented in Campus-Cycle. The system provides users with the ability to sign up and log in using their Google accounts.

## Architecture

### Component Structure

```
Frontend Components:
├── components/
│   └── auth/
│       ├── GoogleLoginButton.jsx      (Login button component)
│       ├── GoogleLoginButton.css      (Login button styles)
│       ├── GoogleSignupButton.jsx     (Signup button component)
│       └── GoogleSignupButton.css     (Signup button styles)
├── pages/
│   ├── GoogleCallback.jsx             (OAuth callback handler)
│   ├── GoogleCallback.css             (Callback page styles)
│   ├── Login.jsx                      (Updated with Google button)
│   └── Register.jsx                   (Updated with Google button)
├── context/
│   └── AuthContext.jsx                (Updated with Google methods)
├── services/
│   └── GoogleAuthService.js           (OAuth utility service)

Backend Implementation:
├── src/
│   ├── routes/
│   │   └── google.routes.js           (Google OAuth routes)
│   ├── controllers/
│   │   └── google.controller.js       (OAuth callback handlers)
│   ├── model/
│   │   └── google.model.js            (Google user schema)
│   ├── app.js                         (Updated with Passport config)
```

## Setup Instructions

### 1. Backend Setup

#### Prerequisites
- Node.js and npm installed
- MongoDB database configured

#### Environment Variables

Add these to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 Credentials (Web Application)
5. Add authorized redirect URI: `http://localhost:3000/api/v1/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

#### Installation

```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup

#### Installation

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Google OAuth Endpoints

#### 1. Initiate Google Login
```
GET /api/v1/auth/auth/google
```
Redirects to Google consent screen

#### 2. Google OAuth Callback
```
GET /api/v1/auth/auth/google/callback
```
- **Description**: Handles OAuth callback from Google
- **Query Parameters**: 
  - `code`: Authorization code from Google
  - `state`: State parameter for security
- **Response**: Redirects to frontend callback handler with token and user data
- **Response Format**:
  ```
  http://localhost:5173/auth/google/callback?token=<jwt_token>&user=<user_json>
  ```

#### 3. Get Google User Profile
```
GET /api/v1/auth/profile
Headers: {
  Authorization: Bearer <token>
}
```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "username": "user_name",
      "email": "user@example.com",
      "googleId": "google_id"
    }
  }
  ```

#### 4. Logout
```
POST /api/v1/auth/logout
Headers: {
  Authorization: Bearer <token>
}
```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## Component Usage

### GoogleLoginButton Component

```jsx
import GoogleLoginButton from './components/auth/GoogleLoginButton';

function MyLoginPage() {
  return (
    <div>
      <GoogleLoginButton />
    </div>
  );
}
```

### GoogleSignupButton Component

```jsx
import GoogleSignupButton from './components/auth/GoogleSignupButton';

function MySignupPage() {
  return (
    <div>
      <GoogleSignupButton />
    </div>
  );
}
```

### Using AuthContext

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { 
    loginWithGoogle,
    signupWithGoogle,
    user,
    isAuthenticated 
  } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}
```

### GoogleAuthService Usage

```jsx
import GoogleAuthService from './services/GoogleAuthService';

// Initiate login
GoogleAuthService.initiateGoogleLogin();

// Get stored token
const token = GoogleAuthService.getStoredToken();

// Check if token is valid
if (GoogleAuthService.isTokenValid()) {
  // Token is still valid
}

// Get auth header for API requests
const headers = GoogleAuthService.getAuthHeader();
```

## Authentication Flow

```
User clicks "Login with Google" button
        ↓
Frontend redirects to: /api/v1/auth/auth/google
        ↓
Passport initiates Google OAuth flow
        ↓
User approves on Google consent screen
        ↓
Google redirects to: /api/v1/auth/google/callback?code=...
        ↓
Backend verifies code with Google
        ↓
Backend finds or creates user in MongoDB
        ↓
Backend generates JWT token
        ↓
Backend redirects to: http://localhost:5173/auth/google/callback?token=...&user=...
        ↓
Frontend GoogleCallback component receives token
        ↓
Frontend stores token in localStorage
        ↓
Frontend sets user in AuthContext
        ↓
Frontend redirects to Dashboard
```

## Database Schema

### Google User Schema

```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique, validated),
  googleId: String (required, unique),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Error Handling

### Common Errors

1. **"No token provided"** - User is not authenticated
   - Solution: Redirect to login page

2. **"User not found"** - User was deleted from database
   - Solution: Create new user account

3. **"Authentication failed"** - Google authentication failed
   - Solution: Retry login or check Google credentials

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 401
}
```

## Security Features

1. **JWT Tokens**: Secure token-based authentication
2. **HTTP-Only Cookies**: Sensitive tokens stored in HTTP-only cookies
3. **CORS**: Configured to accept requests only from frontend
4. **Password Hashing**: Uses bcryptjs for secure password hashing
5. **Token Expiration**: Tokens expire after 7 days
6. **State Parameter**: OAuth state parameter prevents CSRF attacks

## Development Tips

### Testing Google Login

1. Ensure backend is running on `http://localhost:3000`
2. Ensure frontend is running on `http://localhost:5173`
3. Verify Google Client ID and Secret in `.env`
4. Check browser console for any CORS errors
5. Use browser DevTools to inspect network requests

### Debugging

1. Check backend logs: `npm run dev` in backend directory
2. Check frontend console: F12 in browser
3. Verify database: Check MongoDB for user creation
4. Test token validation: Check localStorage in browser

### Common Issues

**Issue**: Redirect URI mismatch
- **Solution**: Ensure redirect URI in Google Console matches backend URL

**Issue**: CORS errors
- **Solution**: Verify CORS configuration in `app.js`

**Issue**: Token not being stored
- **Solution**: Check if browser allows localStorage access

## File Structure Details

### GoogleLoginButton.jsx
- Button component for initiating Google login
- Calls `loginWithGoogle()` from AuthContext
- Styled with Google brand colors

### GoogleSignupButton.jsx
- Button component for Google signup
- Uses same authentication flow as login
- Returns different UI text

### GoogleCallback.jsx
- Handles OAuth callback from Google
- Extracts token and user data from URL
- Manages loading states and error handling
- Automatically redirects on success

### GoogleAuthService.js
- Utility functions for OAuth operations
- Token management (store, retrieve, validate)
- URL parameter parsing
- Authorization header generation

### google.controller.js
- `googleAuthCallback`: Handles OAuth callback
- `googleAuthInitiate`: Placeholder for OAuth initiation
- `getGoogleUserProfile`: Retrieve user profile
- `googleLogout`: Logout user

### google.routes.js
- `/auth/google`: Initiate OAuth flow
- `/auth/google/callback`: Handle OAuth callback
- `/profile`: Get user profile
- `/logout`: Logout endpoint

## Production Deployment

### Before Deploying

1. Update redirect URIs in Google Cloud Console
2. Set `NODE_ENV=production` in backend `.env`
3. Update `FRONTEND_URL` to production domain
4. Enable HTTPS for all URLs
5. Set `secure: true` in cookie configuration

### Environment Variables (Production)

```env
GOOGLE_CLIENT_ID=production_client_id
GOOGLE_CLIENT_SECRET=production_client_secret
JWT_SECRET=secure_random_secret
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
MONGODB_URI=your_production_db_uri
```

## Troubleshooting

### Token expires immediately
- Check `JWT_EXPIRE` value in `.env`
- Verify server time is correct

### User not found after login
- Check MongoDB connection
- Verify user creation in google.controller.js

### CORS errors when logging in
- Verify frontend URL in CORS configuration
- Ensure credentials are included in requests

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [JWT Authentication](https://jwt.io/)

## Support

For issues or questions:
1. Check this documentation
2. Review error logs
3. Consult Passport.js documentation
4. Check Google OAuth documentation
