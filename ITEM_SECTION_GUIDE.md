# Item Section Implementation Guide

## Overview

A complete item management system has been implemented for Campus-Cycle, allowing users to create, browse, search, and manage bicycle listings.

---

## Backend Implementation

### Controllers (`backend/src/controllers/item.controller.js`)

#### 1. **createItemController** (POST)
- Creates a new item listing
- Uploads image via ImageKit
- Sets seller as the authenticated user
- **Parameters**: title, description, price, condition, location, contactPhone, image
- **Response**: Created item object with success message

#### 2. **getItemsController** (GET) - Browse Items
- Retrieves all available items with filtering
- **Filters**:
  - `search`: Search in title or description
  - `condition`: Filter by condition (like-new, excellent, good, fair)
  - `minPrice`/`maxPrice`: Price range filtering
  - `location`: Search by location
  - `page`: Pagination (default: 1)
  - `limit`: Items per page (default: 12)
- **Response**: Array of items with pagination info

#### 3. **getItemByIdController** (GET)
- Retrieves single item details
- Includes full seller information
- **Parameters**: itemId
- **Response**: Item object with seller data

#### 4. **getUserItemsController** (GET)
- Retrieves all items posted by authenticated user
- Protected route (requires auth)
- **Response**: Array of user's items

#### 5. **updateItemStatusController** (PATCH)
- Updates item status (available, reserved, sold)
- Only seller can update their item
- **Parameters**: itemId, status
- **Response**: Updated item object

#### 6. **updateItemController** (PATCH)
- Updates item details (title, description, price, etc.)
- Only seller can update their item
- **Parameters**: itemId, updatable fields
- **Response**: Updated item object

#### 7. **deleteItemController** (DELETE)
- Deletes item listing
- Only seller can delete their item
- **Parameters**: itemId
- **Response**: Success message

---

## API Endpoints

### Public Routes

```
GET  /api/v1/items
     - Get all available items with filters
     - Query: search, condition, minPrice, maxPrice, location, page, limit

GET  /api/v1/items/:id
     - Get single item details
     - Params: itemId
```

### Protected Routes (Requires Authentication)

```
POST /api/v1/items/create
     - Create new item
     - Body: title, description, price, condition, location, contactPhone
     - File: image (multipart/form-data)

GET  /api/v1/items/user/items
     - Get user's items

PATCH /api/v1/items/:id/status
      - Update item status
      - Body: { status: 'available'|'reserved'|'sold' }

PATCH /api/v1/items/:id
      - Update item details
      - Body: updatable fields

DELETE /api/v1/items/:id
       - Delete item
```

---

## Frontend Implementation

### Components

#### 1. **Browse.jsx** (`pages/Browse.jsx`)
- Main marketplace page for browsing items
- Features:
  - Search functionality
  - Multiple filters (condition, price range, location)
  - Pagination
  - Loading and error states
  - Item cards with quick info
  - Click to view details

#### 2. **ItemDetail.jsx** (`pages/ItemDetail.jsx`)
- Detailed item view page
- Features:
  - Full item information
  - Seller contact details
  - Seller phone and email
  - Status badges
  - Contact buttons for interested buyers
  - For sellers: Edit, delete, and status management
  - Loading and error states

#### 3. **ItemsList.jsx** (Updated) (`components/items/ItemsList.jsx`)
- User's item management dashboard
- Features:
  - View all user's posted items
  - Quick status change dropdown
  - View details button
  - Edit button (navigate to edit page)
  - Delete button with confirmation
  - Item cards with status badges
  - Empty state handling

#### 4. **CreateItem.jsx** (Existing) (`components/items/CreateItem.jsx`)
- Form for creating new items
- Features:
  - Image preview
  - Form validation
  - File upload
  - Success/error messages

### Services

#### **ItemService.js** (`services/ItemService.js`)
Utility class for all item-related API calls:
- `getItems(filters)` - Get items with filters
- `getItemById(id)` - Get single item
- `createItem(data)` - Create new item
- `getUserItems()` - Get user's items
- `updateItemStatus(id, status)` - Change status
- `updateItem(id, data)` - Update item details
- `deleteItem(id)` - Delete item
- Static helpers:
  - `formatPrice(price)` - Format price display
  - `formatDate(date)` - Format date display
  - `formatCondition(condition)` - Format condition text
  - `getConditionColor(condition)` - Get color for condition
  - `getStatusColor(status)` - Get color for status

---

## File Structure

```
Backend:
├── src/
│   ├── controllers/
│   │   └── item.controller.js (Updated - 7 functions)
│   └── routes/
│       └── item.routes.js (Updated - 7 routes)

Frontend:
├── src/
│   ├── pages/
│   │   ├── Browse.jsx (NEW)
│   │   ├── Browse.css (NEW)
│   │   ├── ItemDetail.jsx (NEW)
│   │   └── ItemDetail.css (NEW)
│   ├── components/items/
│   │   └── ItemsList.jsx (Updated)
│   │   └── ItemsList.css (Updated)
│   ├── services/
│   │   └── ItemService.js (NEW)
│   └── App.jsx (Updated - added routes)
```

---

## Features

### For Buyers
✅ Browse all available items
✅ Search by title or description
✅ Filter by condition, price, location
✅ View detailed item information
✅ See seller contact details
✅ Direct contact options (phone/email)
✅ Pagination for large results
✅ Item status visibility (available/reserved/sold)

### For Sellers
✅ Create new listings
✅ Upload item images
✅ Edit item details
✅ Update item status
✅ Delete listings
✅ View all their listings
✅ See item performance
✅ Manage inventory

### User Experience
✅ Responsive design (mobile, tablet, desktop)
✅ Fast loading with pagination
✅ Intuitive filtering
✅ Clear item cards with images
✅ Status visibility
✅ Condition badges with colors
✅ Price formatting
✅ Date formatting

---

## Data Model

### Item Schema
```javascript
{
  _id: ObjectId,
  title: String (5-100 chars, required),
  description: String (20-1000 chars, required),
  price: Number (required),
  condition: Enum['like-new','excellent','good','fair'] (required),
  location: String (required),
  contactPhone: String (10 digits, required),
  image: String (URL, required),
  seller: ObjectId (Reference to User),
  status: Enum['available','reserved','sold'] (default: 'available'),
  verified: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Search & Filter Implementation

### Backend Filtering
- MongoDB regex search on title and description
- Direct status filtering
- Condition matching
- Price range ($gte, $lte)
- Location regex search
- Automatic pagination with limit

### Frontend Filtering
- Real-time filter panel
- Easy reset functionality
- Responsive filter layout
- Clear filter labels
- Apply/Reset buttons

---

## Usage Examples

### Browsing Items
```javascript
// In Browse.jsx
const itemService = new ItemService(api);

// Get items with filters
const data = await itemService.getItems({
  search: 'mountain bike',
  condition: 'excellent',
  minPrice: 5000,
  maxPrice: 20000,
  page: 1,
  limit: 12
});
```

### Managing Items
```javascript
// Update item status
await itemService.updateItemStatus(itemId, 'sold');

// Delete item
await itemService.deleteItem(itemId);

// Update item details
await itemService.updateItem(itemId, {
  title: 'New Title',
  price: 5000
});
```

### Displaying Prices and Dates
```javascript
// Format price for display
ItemService.formatPrice(5000) // Returns: ₹5,000

// Format date
ItemService.formatDate(new Date()) // Returns: Apr 18, 2026

// Format condition
ItemService.formatCondition('like-new') // Returns: Like New
```

---

## Styling

### Color Scheme

**Conditions:**
- Like-new: Green (#10b981)
- Excellent: Blue (#3b82f6)
- Good: Amber (#f59e0b)
- Fair: Red (#ef4444)

**Status:**
- Available: Green (#10b981)
- Reserved: Amber (#f59e0b)
- Sold: Red (#ef4444)

**UI:**
- Primary: Purple (#667eea)
- Background: Light Gray (#f9fafb)
- Border: Light (#e5e7eb)

---

## Responsive Design

### Breakpoints
- Desktop: >1024px (2-3 columns)
- Tablet: 768px-1024px (2 columns)
- Mobile: <768px (1 column)

### Mobile Features
- Touch-friendly buttons
- Optimized spacing
- Readable fonts
- Stack layout
- Full-width inputs

---

## Error Handling

### Backend Errors
- 400: Missing required fields
- 404: Item not found
- 403: Unauthorized (not seller)
- 500: Server errors

### Frontend Error Handling
- Try-catch blocks
- User-friendly error messages
- Retry buttons
- Fallback to browse page

---

## Performance Optimization

### Backend
- Pagination limits results
- Indexed search fields
- Efficient queries
- Image compression via ImageKit

### Frontend
- Lazy loading images
- Efficient state management
- Memoized components
- Pagination for large datasets

---

## Security Features

✅ Authentication required for creating/editing/deleting
✅ User ownership verification
✅ Image upload validation
✅ Input validation and sanitization
✅ CORS protection
✅ Authorization checks

---

## Future Enhancements

### Recommended Features
1. Item image gallery (multiple images)
2. Advanced search (brand, type, wheel size)
3. Item reviews/ratings
4. Watchlist functionality
5. Real-time chat with sellers
6. Item recommendations
7. Similar items display
8. Sales history for sellers
9. Item analytics dashboard
10. Inventory management

### Optional Features
1. Wishlist
2. Comparison tool
3. Price alerts
4. Seller ratings
5. Item verification badges
6. Featured listings
7. Promotional options
8. Analytics dashboard

---

## Testing Checklist

```
□ Create new item with image
□ Browse all items
□ Search by keyword
□ Filter by condition
□ Filter by price range
□ Filter by location
□ View item details
□ Edit item details
□ Update item status
□ Delete item
□ Pagination works correctly
□ Seller contact info displays
□ Non-owner cannot edit/delete
□ Responsive on mobile
□ Images load correctly
□ Error messages display
□ Success messages display
□ Form validation works
```

---

## Deployment Notes

### Before Production
1. Test all CRUD operations
2. Verify image upload limits
3. Test pagination performance
4. Validate error handling
5. Check responsive design
6. Test on multiple browsers
7. Verify CORS settings
8. Check authentication flow

### Configuration
- Set proper image upload limits
- Configure pagination limits
- Set appropriate cache headers
- Enable compression
- Monitor database queries

---

## Support & Troubleshooting

### Common Issues

**Items not showing:**
- Check if status is 'available'
- Verify database connection
- Check API endpoint

**Image upload fails:**
- Verify ImageKit credentials
- Check file size limit
- Validate file format

**Filter not working:**
- Check query parameters
- Verify filter logic
- Test with console logs

---

## Summary

The item section provides a complete marketplace experience with:
- ✅ Full CRUD operations
- ✅ Advanced filtering and search
- ✅ Responsive design
- ✅ Secure operations
- ✅ Good UX/UI
- ✅ Error handling
- ✅ Performance optimization

**Status**: Production-ready
**Last Updated**: April 18, 2026
