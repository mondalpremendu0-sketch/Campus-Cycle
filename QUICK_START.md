# Campus Cycle - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
MONGODB_URI=mongodb://localhost:27017/campus-cycle
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
IMAGEKIT_PUBLIC_KEY=public_key
IMAGEKIT_PRIVATE_KEY=private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

Start backend:
```bash
npm run dev
```
Backend will run on `http://localhost:3000`

### Step 2: Frontend Setup
```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

### Step 3: Test the Application

**In Browser:**
1. Open `http://localhost:5173`
2. Click "Sign Up" to create account
3. Fill registration form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Phone: `9876543210`
   - Address: `Campus Hostel A`
   - Year: `2nd`
   - Department: `CSE`
4. Click "Create Account"
5. Go to Dashboard
6. Click "Post New Item" tab
7. Fill item form and post
8. View posted items in "My Items" tab

## 📁 Key Files to Know

### Frontend
- `src/context/AuthContext.jsx` - Authentication logic
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Registration page
- `src/pages/Dashboard.jsx` - Main user dashboard
- `src/components/items/CreateItem.jsx` - Item posting form

### Backend
- `src/app.js` - Express configuration and CORS setup
- `src/controllers/user.controller.js` - Auth logic
- `src/controllers/item.controller.js` - Item logic
- `src/routes/user.routes.js` - User endpoints
- `src/routes/item.routes.js` - Item endpoints

## 🎯 API Endpoints Quick Reference

### Authentication
```
POST   /api/v1/users/register
POST   /api/v1/users/login
GET    /api/v1/users/profile (auth required)
POST   /api/v1/users/logout (auth required)
```

### Items
```
POST   /api/v1/items/create (auth required, multipart/form-data)
GET    /api/v1/items
GET    /api/v1/items/user/items (auth required)
```

## 🔐 Authentication Flow

1. User registers → Backend stores hashed password
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Token sent with every authenticated request
5. AuthContext validates token on app load
6. Protected routes check authentication status

## 📝 Form Examples

### Register
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Secure@123",
  "phoneNo": "9876543210",
  "address": "Campus Hostel B",
  "year": "2nd",
  "department": "CSE"
}
```

### Create Item
```
Title: Used Mountain Bike
Description: Well-maintained 21-speed cycle, good condition
Price: 5000
Condition: good
Location: Main Gate
Phone: 9876543210
Image: [file upload]
```

## 🎨 Component Structure

```
App (with Router & AuthProvider)
├── Navbar (shows auth buttons)
├── Routes
│   ├── / → Home
│   ├── /register → Register
│   ├── /login → Login
│   └── /dashboard → Dashboard (protected)
│       ├── CreateItem (tab)
│       └── ItemsList (tab)
└── Context & State (AuthContext)
```

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to server" | Check if backend is running on port 3000 |
| "CORS error" | Backend CORS config includes http://localhost:5173 |
| "Image upload fails" | Check ImageKit credentials and file size |
| "Login doesn't work" | Check MongoDB connection and JWT_SECRET in .env |
| "Token not persisting" | Clear localStorage: `localStorage.clear()` |

## 📊 Database Models

### User
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  phoneNo: String,
  address: String,
  year: String,
  department: String,
  createdAt: Date
}
```

### Item
```javascript
{
  title: String,
  description: String,
  price: Number,
  condition: String (like-new, excellent, good, fair),
  location: String,
  contactPhone: String,
  image: String (ImageKit URL),
  seller: ObjectId (User reference),
  status: String (available, reserved, sold),
  createdAt: Date,
  updatedAt: Date
}
```

## 💡 Key Features Implemented

✅ User Registration with validation
✅ Secure Login with JWT tokens
✅ Protected Routes (Dashboard)
✅ Create Item Listings with image upload
✅ View User's Items
✅ Form Validation (React Hook Form)
✅ Responsive Design
✅ Separate CSS per component
✅ Context API for state management
✅ Error handling and messages

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 480px - 768px
- Mobile: < 480px

## 🔄 Development Tips

1. **Frontend Changes**: Auto-reload with Vite
2. **Backend Changes**: Restart with `npm run dev` or add nodemon
3. **Debugging**: Use browser DevTools and terminal logs
4. **API Testing**: Use Postman or VS Code REST Client
5. **Database**: Use MongoDB Compass to view collections

## 🚢 Deployment Ready

- Frontend: Ready for Vercel/Netlify
- Backend: Ready for Heroku/Railway
- Database: Use MongoDB Atlas (cloud)
- Images: Using ImageKit (external service)

## 📞 Support

For issues or questions, check:
1. Browser console for errors
2. Terminal logs for backend errors
3. Network tab in DevTools for API requests
4. MongoDB Compass for data verification

---

Happy coding! 🎉
