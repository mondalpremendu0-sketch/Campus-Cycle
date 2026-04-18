# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (CLIENT)                         │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  React App (Vite)                                      │    │
│  │  ├─ Router                                             │    │
│  │  ├─ AuthProvider (Context)                            │    │
│  │  └─ Pages & Components                                │    │
│  │     ├─ Home, Login, Register, Dashboard               │    │
│  │     ├─ Navbar, DashboardNav                           │    │
│  │     └─ ProtectedRoute                                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  localStorage: JWT Token                                       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ HTTP Requests
                 │ (Axios with JWT Header)
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER (BACKEND)                         │
│                     Express (Node.js)                           │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Routes                                                │    │
│  │  ├─ /api/v1/users/*  (Auth endpoints)                 │    │
│  │  └─ /api/v1/items/*  (Item endpoints)                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────┐               │
│  │  Middleware                                  │               │
│  │  ├─ CORS                                     │               │
│  │  ├─ Auth Middleware (JWT validation)        │               │
│  │  ├─ Multer (File upload)                    │               │
│  │  └─ Error Handler                           │               │
│  └──────────────────────┬──────────────────────┘               │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────┐               │
│  │  Controllers                                 │               │
│  │  ├─ user.controller.js                      │               │
│  │  │  ├─ register                             │               │
│  │  │  ├─ login                                │               │
│  │  │  ├─ profile                              │               │
│  │  │  └─ logout                               │               │
│  │  └─ item.controller.js                      │               │
│  │     ├─ createItem                           │               │
│  │     ├─ getItems                             │               │
│  │     └─ getUserItems                         │               │
│  └──────────────────────┬──────────────────────┘               │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────┐               │
│  │  Models (Mongoose)                          │               │
│  │  ├─ User Model                              │               │
│  │  └─ Item Model                              │               │
│  └──────────────────────┬──────────────────────┘               │
│                         │                                       │
└────────────────┬────────┼────────────────────────────────────────┘
                 │        │
                 │        │
        ┌────────▼────────▼────────┐
        │   External Services      │
        │                          │
        │  ┌──────────────────┐   │
        │  │ MongoDB          │   │
        │  │ (Database)       │   │
        │  └──────────────────┘   │
        │                          │
        │  ┌──────────────────┐   │
        │  │ ImageKit         │   │
        │  │ (Image Hosting)  │   │
        │  └──────────────────┘   │
        │                          │
        └──────────────────────────┘
```

## Frontend Component Tree

```
App (with Router & AuthProvider)
├── Home Page
│   ├── Navbar
│   ├── Hero
│   ├── Context
│   ├── HowItWorks
│   └── Footer
│
├── Login Page
│   ├── Login Form (React Hook Form)
│   │   ├── Email Input
│   │   └── Password Input
│   └── Links (Register, Home)
│
├── Register Page
│   ├── Registration Form (React Hook Form)
│   │   ├── Username Input
│   │   ├── Email Input
│   │   ├── Password Input
│   │   ├── Phone Input
│   │   ├── Address Input
│   │   ├── Year Dropdown
│   │   └── Department Input
│   └── Links (Login, Home)
│
└── Dashboard Page (Protected Route)
    ├── DashboardNav
    ├── Tab 1: Create Item
    │   └── CreateItem Component
    │       ├── Title Input
    │       ├── Description Textarea
    │       ├── Price Input
    │       ├── Condition Dropdown
    │       ├── Location Input
    │       ├── Phone Input
    │       ├── Image Upload
    │       └── Submit Button
    │
    └── Tab 2: My Items
        └── ItemsList Component
            ├── Item Card 1
            │   ├── Image
            │   ├── Title & Description
            │   ├── Price & Condition
            │   ├── Location & Contact
            │   └── Status
            ├── Item Card 2
            └── Item Card 3
```

## Data Flow Diagram

### Authentication Flow
```
User Input (Login/Register)
        │
        ▼
Form Validation (React Hook Form)
        │
    ┌───┴───┐
    │       │
  Error   Valid
    │       │
    ▼       ▼
Show Error  API Request
    │       │
    │       ▼
    │   Axios Interceptor
    │   (Adds token if exists)
    │       │
    │       ▼
    │   Backend Route
    │   (Validation & Processing)
    │       │
    │       ▼
    │   Generate JWT Token
    │       │
    │       ▼
    │   Database Save (User)
    │       │
    └───────▼
        Response
        (token + user data)
            │
            ▼
    Store Token (localStorage)
            │
            ▼
    Update AuthContext
            │
            ▼
    Redirect to Dashboard
```

### Item Creation Flow
```
User Fills Form (CreateItem)
        │
        ▼
Select Image File
        │
        ▼
Preview Image
        │
        ▼
Validate Form (React Hook Form)
        │
    ┌───┴───┐
    │       │
  Error   Valid
    │       │
    ▼       ▼
Show Error  Create FormData
    │       │
    │       ├─ Text fields
    │       ├─ File object
    │       └─ User ID
    │       │
    │       ▼
    │   Axios POST Request
    │   (with JWT token)
    │       │
    │       ▼
    │   Backend Processing
    │   ├─ Validate data
    │   ├─ Upload image to ImageKit
    │   ├─ Get image URL
    │   └─ Save to MongoDB
    │       │
    │       ▼
    │   Success Response
    │       │
    └───────▼
    Update UI
    ├─ Show success message
    ├─ Reset form
    └─ Switch to "My Items" tab
            │
            ▼
    Fetch Updated Items List
            │
            ▼
    Display Items in Grid
```

## State Management

### AuthContext State
```
AuthContext
├── user: {
│   ├─ _id: string
│   ├─ username: string
│   ├─ email: string
│   ├─ phoneNo: string
│   ├─ address: string
│   ├─ year: string
│   └─ department: string
├── token: string (JWT)
├── loading: boolean
├── isAuthenticated: boolean
└── api: axios instance with interceptors
```

### Component State Examples

#### CreateItem
```
Form Fields (React Hook Form)
├─ title
├─ description
├─ price
├─ condition
├─ location
├─ contactPhone
└─ image

UI State
├─ imagePreview: file preview URL
├─ loading: submission state
├─ serverError: error message
└─ successMessage: success message
```

#### ItemsList
```
Data State
├─ items: array of items
├─ loading: fetch state
└─ error: error message
```

## Database Schema

### User Collection
```
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  phoneNo: String (required),
  address: String (required),
  year: String (1st, 2nd, 3rd, 4th),
  department: String (required),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Item Collection
```
{
  _id: ObjectId,
  title: String (required, 5-100 chars),
  description: String (required, 20-1000 chars),
  price: Number (required),
  condition: String (like-new, excellent, good, fair),
  location: String (required),
  contactPhone: String (required, 10 digits),
  image: String (ImageKit URL),
  seller: ObjectId (ref: User),
  status: String (available, reserved, sold),
  verified: Boolean (default: false),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## API Request/Response Examples

### Register Request
```
POST /api/v1/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Secure@123",
  "phoneNo": "9876543210",
  "address": "Campus Hostel A",
  "year": "2nd",
  "department": "CSE"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "_id": "123...",
    "username": "john_doe",
    "email": "john@example.com",
    ...
  }
}
```

### Create Item Request
```
POST /api/v1/items/create
Content-Type: multipart/form-data
Authorization: Bearer {token}

FormData:
├─ title: "Mountain Bike"
├─ description: "21-speed cycle..."
├─ price: 5000
├─ condition: "good"
├─ location: "Main Gate"
├─ contactPhone: "9876543210"
└─ image: [File]

Response 201:
{
  "success": true,
  "message": "Item created successfully",
  "item": {
    "_id": "456...",
    "title": "Mountain Bike",
    "price": 5000,
    "image": "https://imagekit.io/...",
    "seller": "123...",
    ...
  }
}
```

## Middleware Chain

```
HTTP Request
    │
    ▼
CORS Middleware
    │
    ▼
Express JSON Parser
    │
    ▼
Morgan Logger (dev)
    │
    ▼
Passport Initializer
    │
    ▼
URL Encoded Parser
    │
    ▼
Cookie Parser
    │
    ▼
Route Handler
    │
    ├─ Public Route (Login/Register/Get Items)
    │
    └─ Protected Route
        │
        ▼
    Auth Middleware (JWT Validation)
        │
    ┌───┴───┐
    │       │
  Invalid  Valid
    │       │
    ▼       ▼
Return 401  Next
    │       │
    │       ├─ Multer (if file upload)
    │       │
    │       ▼
    │   Controller Logic
    │       │
    └───────▼
    Response Handler
        │
        ▼
Error Middleware
        │
        ▼
HTTP Response
```

## Performance Considerations

### Frontend
- ✅ Lazy loading with React Router
- ✅ Image optimization (ImageKit)
- ✅ Form validation prevents unnecessary requests
- ✅ JWT token persistence avoids re-login
- ✅ Component memoization possible with useMemo

### Backend
- ✅ JWT reduces database queries per request
- ✅ MongoDB indexing on email field
- ✅ Multer memory storage (no disk writes)
- ✅ ImageKit offloads image processing
- ✅ Error handling prevents crashes

## Security Measures

### Frontend
```
✅ JWT token in secure localStorage
✅ Protected routes prevent unauthorized access
✅ Form validation prevents invalid data
✅ HTTPS ready (credentials flag enabled)
✅ Error messages don't expose sensitive data
```

### Backend
```
✅ Password hashing with bcryptjs
✅ JWT authentication required for protected routes
✅ CORS restricted to allowed origins
✅ Input validation before database operations
✅ SQL injection prevention (Mongoose)
✅ Error messages sanitized
```

## Scalability Architecture

### Current Scale
- ✅ Handles single user registration
- ✅ Multiple item listings per user
- ✅ Image uploads to external service

### Future Scaling
- [ ] Database indexing on frequently queried fields
- [ ] API caching with Redis
- [ ] Message queue for image processing
- [ ] Load balancing for multiple backend instances
- [ ] CDN for frontend assets
- [ ] Database replication for high availability
- [ ] Microservices for specific features

## Deployment Architecture

```
┌─────────────────────────────────────┐
│  Frontend (Vercel/Netlify)          │
│  ├─ React app                       │
│  ├─ Static assets                   │
│  └─ Environment variables           │
└────────────┬────────────────────────┘
             │ HTTPS
             │
┌────────────▼────────────────────────┐
│  Backend (Heroku/Railway)           │
│  ├─ Node.js/Express server          │
│  ├─ MongoDB Atlas connection        │
│  └─ Environment variables           │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│  External Services                  │
│  ├─ MongoDB Atlas                   │
│  ├─ ImageKit                        │
│  └─ Passport OAuth (optional)       │
└─────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a modern, scalable, and secure web application.
