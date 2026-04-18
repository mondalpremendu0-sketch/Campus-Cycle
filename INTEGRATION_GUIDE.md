# Campus Cycle - Integration Documentation

## Project Overview
Campus Cycle is a full-stack web application for buying and selling used cycles on campus. It integrates a React frontend with an Express backend using modern web technologies.

## Technology Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM 7** - Client-side routing
- **React Hook Form 7** - Form validation and management
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Express 5** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Multer** - File uploads
- **ImageKit** - Image hosting
- **Passport** - OAuth integration
- **bcryptjs** - Password hashing

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Home.css
│   │   ├── Login.jsx      # Login page
│   │   ├── Login.css
│   │   ├── Register.jsx   # Registration page
│   │   ├── Register.css
│   │   ├── Dashboard.jsx  # User dashboard
│   │   └── Dashboard.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── DashboardNav.jsx
│   │   ├── DashboardNav.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── Hero.jsx
│   │   ├── Context.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Footer.jsx
│   │   └── items/
│   │       ├── CreateItem.jsx   # Post new cycle form
│   │       ├── CreateItem.css
│   │       ├── ItemsList.jsx    # Display user's cycles
│   │       └── ItemsList.css
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
└── package.json
```

### Backend Structure
```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── item.controller.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── item.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── item.model.js
│   │   └── google.model.js
│   ├── services/
│   │   └── imagekit.service.js
│   ├── utils/
│   │   └── error.utils.js
│   └── db/
│       └── db.js
├── server.js
└── package.json
```

## Routes and Endpoints

### User Routes
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/v1/users/register` | No | Register new user |
| POST | `/api/v1/users/login` | No | Login user |
| GET | `/api/v1/users/profile` | Yes | Get user profile |
| POST | `/api/v1/users/logout` | Yes | Logout user |

### Item Routes
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/v1/items/create` | Yes | Create new item listing |
| GET | `/api/v1/items` | No | Get all available items |
| GET | `/api/v1/items/user/items` | Yes | Get user's items |

## Features

### Authentication Flow
1. **Registration**: Users create account with email, password, phone, address, year, and department
2. **Login**: Email and password authentication with JWT token
3. **Protected Routes**: Dashboard and item creation require authentication
4. **Auto-logout**: Tokens stored in localStorage; cleared on logout
5. **Token Refresh**: Profile check on app load validates existing tokens

### Item Management
1. **Create Listing**: Authenticated users can post cycles with:
   - Title and description
   - Price and condition
   - Location and contact phone
   - Image upload (via ImageKit)
2. **View Listings**: Users can see their posted items in dashboard
3. **Item Details**: Each listing shows condition, price, location, and timestamp

### Form Validation
All forms use React Hook Form with validation:
- **Email**: Valid email format required
- **Password**: Minimum 6 characters
- **Phone**: Exactly 10 digits
- **Title**: 5-100 characters
- **Description**: 20-1000 characters
- **Price**: Positive number

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- ImageKit account (for image uploads)
- Google OAuth credentials (optional, for social login)

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Start development server
npm run dev
```
Server runs on `http://localhost:3000`

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
App runs on `http://localhost:5173`

## Component Breakdown

### Pages
- **Home**: Landing page with hero, features, and CTA
- **Register**: User registration form with validation
- **Login**: User authentication form
- **Dashboard**: User dashboard with two tabs:
  - Create Item: Form to post new cycles
  - My Items: List of user's cycle listings

### Key Components
- **AuthContext**: Global state management for authentication
- **ProtectedRoute**: Wrapper for routes requiring authentication
- **CreateItem**: Form with image upload and validation
- **ItemsList**: Grid display of user's items
- **Navbar**: Navigation with auth status
- **DashboardNav**: Dashboard-specific navigation

## CSS Organization
Each component has its own CSS file for better organization:
```
ComponentName.jsx    → ComponentName.css
```
This ensures:
- Scoped styling
- Easy maintenance
- Clear component-CSS relationship
- Reusability

## Form Validation Examples

### Register Form
```javascript
{
  username: "John Doe",
  email: "john@example.com",
  password: "secure123",
  phoneNo: "9876543210",
  address: "Campus Hostel A",
  year: "2nd",
  department: "CSE"
}
```

### Create Item Form
```javascript
{
  title: "Mountain Bike 21-Speed",
  description: "Well-maintained cycle in excellent condition...",
  price: 5000,
  condition: "good",
  location: "Main Gate",
  contactPhone: "9876543210",
  image: File // File object from input
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Styling Details

### Color Scheme
- Primary Gradient: `#667eea` → `#764ba2`
- Text Dark: `#333`
- Text Light: `#666` / `#999`
- Border: `#ddd`
- Background: `#f5f7fa`

### Component Styling
- **Buttons**: Gradient background, hover effects, smooth transitions
- **Forms**: Outlined inputs, focus states, error highlights
- **Cards**: Subtle shadows, hover elevation, rounded corners
- **Responsive**: Mobile-first design with breakpoints at 768px and 480px

## Common Issues & Solutions

### CORS Errors
Ensure backend has CORS enabled for frontend origin:
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
```

### Image Upload Fails
- Check ImageKit credentials
- Verify file size (max 5MB)
- Ensure image format is supported

### Token Not Persisting
- Check localStorage in browser DevTools
- Verify JWT secret matches across requests
- Clear cookies if they conflict

### Database Errors
- Ensure MongoDB is running
- Verify connection string in .env
- Check database credentials

## Development Workflow

1. **Start Backend**: `npm run dev` in backend folder
2. **Start Frontend**: `npm run dev` in frontend folder
3. **Test API**: Use Postman or similar tool
4. **Check Console**: Both browser and terminal for errors
5. **Hot Reload**: Changes save automatically in Vite

## Next Steps for Enhancement
- [ ] Add Browse/Search functionality for all items
- [ ] Implement Messages between buyers and sellers
- [ ] Add Rating and Review system
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Admin dashboard for moderation
- [ ] Email notifications
- [ ] Advanced filtering and sorting
- [ ] Wishlist functionality
