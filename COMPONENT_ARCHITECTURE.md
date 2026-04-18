# Component-Wise Architecture & CSS Structure

## 📐 Component Organization

Campus Cycle follows a component-based architecture with the following structure:

### Pages (Page-Level Components)
Pages represent entire views/routes in the application. Each page has its own CSS file.

#### Home.jsx / Home.css
- **Purpose**: Landing page with hero section, features, and call-to-action
- **Features**: 
  - Displays Navbar, Hero, Context, HowItWorks, Footer
  - Public page (no auth required)
- **CSS**: Global page layout, main content area styling

#### Login.jsx / Login.css
- **Purpose**: User authentication
- **Form Fields**:
  - Email (with email validation)
  - Password (minimum 6 characters)
- **Validation**: react-hook-form with error messages
- **CSS**: Gradient background, centered form card, button styling, responsive design
- **Features**: 
  - Error message display
  - Link to register page
  - Smooth animations

#### Register.jsx / Register.css
- **Purpose**: User account creation
- **Form Fields**:
  - Username (min 3 chars)
  - Email (valid email format)
  - Password (min 6 chars)
  - Phone Number (10 digits)
  - Address
  - Year (dropdown: 1st, 2nd, 3rd, 4th)
  - Department
- **Validation**: Comprehensive form validation with field-level errors
- **CSS**: Similar to Login with form-row grid for better layout
- **Features**:
  - Multi-column layout on desktop (2 columns for Year & Department)
  - Single column on mobile
  - Success/error notifications

#### Dashboard.jsx / Dashboard.css
- **Purpose**: Main user interface for logged-in users
- **Layout**:
  - DashboardNav at top
  - Two tabs: "Post New Item" and "My Items"
  - Tab content area
- **Features**:
  - Tab switching functionality
  - Item refresh trigger
  - Protected route (requires authentication)
- **CSS**: 
  - Tab styling with active states
  - Gradient header
  - Responsive tab layout
  - Content panel styling

### Components (Reusable Components)

#### ProtectedRoute.jsx
- **Purpose**: Wrapper component for authenticated routes
- **Logic**:
  - Checks if user is authenticated
  - Shows loading state while checking
  - Redirects to login if not authenticated
  - Returns protected component if authenticated
- **Usage**: Wrap routes requiring authentication

#### Navbar.jsx / Navbar.css
- **Purpose**: Site-wide navigation
- **Features**:
  - Logo with branding
  - Navigation links (Problem, Why Us, How it Works)
  - Authentication buttons (Login/Register or Dashboard/Logout)
  - Mobile hamburger menu
- **Responsive Design**:
  - Desktop: Full nav bar with all links
  - Mobile: Hamburger menu that expands
- **CSS**: 
  - Fixed positioning
  - Gradient buttons
  - Smooth transitions
  - Mobile toggle functionality

#### DashboardNav.jsx / DashboardNav.css
- **Purpose**: Dashboard-specific navigation
- **Features**:
  - Brand name
  - User email display
  - Logout button
  - Sticky positioning
- **CSS**: 
  - Gradient background matching brand
  - Different from main Navbar
  - Compact design

#### Hero.jsx
- **Purpose**: Landing page hero section
- **Features**: Large visual introduction to the platform

#### Context.jsx
- **Purpose**: Platform context/mission section
- **Features**: Explains why Campus Cycle exists

#### HowItWorks.jsx
- **Purpose**: Step-by-step guide for users
- **Features**: Shows process of using the platform

#### Footer.jsx
- **Purpose**: Footer information
- **Features**: Links, copyright, social media

### Item Components (items folder)

#### CreateItem.jsx / CreateItem.css
- **Purpose**: Form for posting new cycle listings
- **Form Fields**:
  - Title (5-100 chars)
  - Description (20-1000 chars)
  - Price (positive number)
  - Condition (dropdown: like-new, excellent, good, fair)
  - Location
  - Contact Phone (10 digits)
  - Image upload (file input)
- **Features**:
  - Image preview
  - Form validation with error messages
  - Loading state during submission
  - Success message
  - Error handling from server
  - Form reset after submission
- **CSS**:
  - Form grid layout (2 columns for price+condition, location+condition)
  - Dashed border for file input
  - Image preview styling
  - Gradient submit button

#### ItemsList.jsx / ItemsList.css
- **Purpose**: Display user's posted cycle listings
- **Features**:
  - Fetches user's items from API
  - Shows item count in heading
  - Grid layout for items
  - Empty state when no items
  - Loading state
  - Error handling
- **Item Card Display**:
  - Item image with hover effect
  - Title, description, price
  - Condition badge with color coding
  - Location and phone details
  - Status and posted date
- **CSS**:
  - Responsive grid (auto-fill, minmax)
  - Card hover effects
  - Image aspect ratio maintenance
  - Color-coded condition badges
  - Mobile-friendly layout

## 🎨 CSS Structure

### CSS Organization Strategy

Each component has its own CSS file:
```
ComponentName.jsx → ComponentName.css
```

### CSS Architecture

#### Global Styles
- `index.css` - Global colors, fonts, basic resets
- CSS variables for consistency: `--primary`, `--text-main`, `--bg-main`

#### Component-Level CSS
- All component-specific styles in separate files
- No style conflicts between components
- Easy to locate and modify styles

### Color Scheme
```css
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Text Primary: #333
Text Secondary: #666
Text Muted: #999
Border: #ddd
Background: #f5f7fa
White: #fff
```

### Button Styles
```css
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}
```

### Form Field Styles
```css
input, select, textarea {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.input-error {
  border-color: #e74c3c;
}
```

### Responsive Design Breakpoints
```css
/* Desktop: Full layout */
@media (min-width: 768px) { }

/* Tablet: Adjusted layout */
@media (max-width: 768px) { }

/* Mobile: Single column */
@media (max-width: 480px) { }
```

## 🔄 Data Flow

### Authentication Flow
```
User Input (Login/Register)
    ↓
Form Validation (React Hook Form)
    ↓
API Request (AuthContext)
    ↓
Backend Processing
    ↓
JWT Token + User Data
    ↓
Store in AuthContext + localStorage
    ↓
Update UI (Navbar, Protected Routes)
```

### Item Posting Flow
```
User Fills Form (CreateItem)
    ↓
Form Validation (React Hook Form)
    ↓
Image Preview
    ↓
FormData with File + Fields
    ↓
API Request (API interceptor adds token)
    ↓
Backend: Save to MongoDB + Upload Image
    ↓
Success Response
    ↓
Show Success Message
    ↓
Reset Form + Switch to My Items Tab
    ↓
Fetch Updated Items (ItemsList)
```

### Item Fetching Flow
```
Dashboard Loads
    ↓
ItemsList Component Mounts
    ↓
useEffect Triggers
    ↓
API Request with Auth Token
    ↓
Backend Queries MongoDB
    ↓
Returns User's Items
    ↓
Update State (setItems)
    ↓
Re-render Items Grid
```

## 📦 Component Dependencies

### Top-Level
- `App.jsx` - Router, AuthProvider

### Page Level (nested in Routes)
- `Home.jsx` - Public page
- `Login.jsx` - Depends on AuthContext
- `Register.jsx` - Depends on AuthContext
- `Dashboard.jsx` - Protected, depends on ProtectedRoute, AuthContext

### Component Level
- `Navbar.jsx` - Depends on AuthContext, React Router
- `DashboardNav.jsx` - Depends on AuthContext, React Router
- `ProtectedRoute.jsx` - Depends on React Router, AuthContext
- `CreateItem.jsx` - Depends on AuthContext, React Hook Form
- `ItemsList.jsx` - Depends on AuthContext

### Context Level
- `AuthContext.jsx` - Provides authentication state and API methods

## 🎯 Styling Best Practices Applied

1. **Component Isolation**: Each component has its own CSS file
2. **Naming Convention**: Class names use component-scoped naming
3. **CSS Grid & Flexbox**: Used for responsive layouts
4. **Gradient Design**: Consistent use of gradient buttons and backgrounds
5. **Smooth Animations**: Transitions on hover and focus states
6. **Accessibility**: Focus states, proper contrast, semantic HTML
7. **Mobile-First**: Base styles for mobile, enhanced for larger screens
8. **Color Coding**: Condition badges use semantic colors
9. **Consistent Spacing**: Padding and margin consistency
10. **Reusable Classes**: `.btn`, `.form-group`, `.error-message` across components

## 📊 File Size Overview

### Frontend
- Components: ~15 files
- CSS files: ~15 files
- Total component code: ~2000 lines
- Total CSS code: ~2000 lines

### Backend
- Controllers: ~120 lines (item) + ~100 lines (user)
- Routes: ~15 lines each
- Models: ~50 lines each
- Middleware: ~30 lines each

## 🔧 Adding New Components

To add a new component following this structure:

1. Create `NewComponent.jsx` file
2. Create `NewComponent.css` file
3. Import CSS in component
4. Use component-scoped class names
5. Follow existing patterns for consistency

Example:
```jsx
// NewComponent.jsx
import './NewComponent.css';

function NewComponent() {
  return (
    <div className="new-component">
      {/* Component content */}
    </div>
  );
}

export default NewComponent;
```

```css
/* NewComponent.css */
.new-component {
  /* Component-specific styles */
}
```

---

This architecture ensures maintainability, scalability, and clear organization of the Campus Cycle application.
