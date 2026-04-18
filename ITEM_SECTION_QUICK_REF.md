# Item Section - Quick Reference

## 🚀 Quick Start

### Backend Routes
```
GET    /api/v1/items                    # Browse items with filters
GET    /api/v1/items/:id                # Get item details
POST   /api/v1/items/create             # Create item (protected)
GET    /api/v1/items/user/items         # Get user's items (protected)
PATCH  /api/v1/items/:id/status         # Update status (protected)
PATCH  /api/v1/items/:id                # Update item (protected)
DELETE /api/v1/items/:id                # Delete item (protected)
```

### Frontend Pages
| Page | Path | Purpose |
|------|------|---------|
| Browse | `/browse` | View all items with search/filters |
| Item Detail | `/item/:id` | View full item details |
| Dashboard | `/dashboard` | Manage user's items |

---

## 📁 New Files Created

```
Backend:
✅ Updated: controllers/item.controller.js (7 functions)
✅ Updated: routes/item.routes.js (7 endpoints)

Frontend:
✅ NEW: pages/Browse.jsx (Marketplace page)
✅ NEW: pages/Browse.css
✅ NEW: pages/ItemDetail.jsx (Item details page)
✅ NEW: pages/ItemDetail.css
✅ NEW: services/ItemService.js (API utility)
✅ UPDATED: components/items/ItemsList.jsx (Edit/delete added)
✅ UPDATED: components/items/ItemsList.css
✅ UPDATED: App.jsx (Added routes)
✅ NEW: ITEM_SECTION_GUIDE.md (Documentation)
```

---

## 🔑 API Endpoints

### Get Items (with filters)
```javascript
GET /api/v1/items?search=bike&condition=excellent&minPrice=5000&maxPrice=20000&page=1&limit=12
```

### Get Single Item
```javascript
GET /api/v1/items/65f8c3a8b2d1e4f5g6h7i8j9
```

### Create Item (Protected)
```javascript
POST /api/v1/items/create
Content-Type: multipart/form-data

{
  title: "Mountain Bike 21-Speed",
  description: "Great condition...",
  price: 8000,
  condition: "excellent",
  location: "Library Area",
  contactPhone: "9876543210",
  image: <file>
}
```

### Update Status (Protected)
```javascript
PATCH /api/v1/items/:id/status
{
  status: "sold" | "reserved" | "available"
}
```

### Delete Item (Protected)
```javascript
DELETE /api/v1/items/:id
```

---

## 💻 Component Usage

### Browse Items
```jsx
import Browse from './pages/Browse';

<Route path="/browse" element={<Browse />} />
```

### Item Detail
```jsx
import ItemDetail from './pages/ItemDetail';

<Route path="/item/:id" element={<ItemDetail />} />
```

### Use ItemService
```jsx
import ItemService from './services/ItemService';
const { api } = useAuth();
const itemService = new ItemService(api);

// Get items
const data = await itemService.getItems({
  search: 'bike',
  condition: 'excellent',
  page: 1
});

// Format price
ItemService.formatPrice(5000) // "₹5,000"
```

---

## 🎨 Features by User Type

### Buyers
- ✅ Browse all items
- ✅ Search functionality
- ✅ Filter by condition, price, location
- ✅ View detailed information
- ✅ Contact seller
- ✅ See seller details
- ✅ Pagination

### Sellers
- ✅ Create listings
- ✅ Upload images
- ✅ Edit items
- ✅ Update status
- ✅ Delete listings
- ✅ View all items

---

## 🔍 Search & Filter

### Available Filters
| Filter | Type | Example |
|--------|------|---------|
| search | String | "mountain bike" |
| condition | String | "excellent" |
| minPrice | Number | 5000 |
| maxPrice | Number | 20000 |
| location | String | "Library" |
| page | Number | 1 |
| limit | Number | 12 |

### Conditions
- `like-new` - Like New
- `excellent` - Excellent
- `good` - Good
- `fair` - Fair

### Status
- `available` - Available for purchase
- `reserved` - Reserved (not available)
- `sold` - Sold (not available)

---

## 📊 Data Model

### Item Object
```javascript
{
  _id: "ObjectId",
  title: "Mountain Bike 21-Speed",
  description: "Great condition, used only twice...",
  price: 8000,
  condition: "excellent",
  location: "Library Area",
  contactPhone: "9876543210",
  image: "https://imagekit.io/...",
  seller: {
    _id: "UserId",
    username: "john_doe",
    email: "john@example.com",
    phoneNo: "9876543210"
  },
  status: "available",
  verified: false,
  createdAt: "2024-04-18T10:30:00Z",
  updatedAt: "2024-04-18T10:30:00Z"
}
```

---

## 🎯 Common Operations

### Create Item
```javascript
const formData = new FormData();
formData.append('title', 'Mountain Bike');
formData.append('price', 8000);
formData.append('image', imageFile);

const result = await itemService.createItem(formData);
```

### Get Item Details
```javascript
const { item } = await itemService.getItemById(itemId);
```

### Update Item Status
```javascript
await itemService.updateItemStatus(itemId, 'sold');
```

### Delete Item
```javascript
await itemService.deleteItem(itemId);
```

### Search Items
```javascript
const { items, pagination } = await itemService.getItems({
  search: 'bike',
  minPrice: 5000,
  maxPrice: 20000,
  page: 1
});
```

---

## 🎨 Color Scheme

### Condition Badges
- 🟢 Like-new: Green (#10b981)
- 🔵 Excellent: Blue (#3b82f6)
- 🟡 Good: Amber (#f59e0b)
- 🔴 Fair: Red (#ef4444)

### Status Badges
- 🟢 Available: Green (#10b981)
- 🟡 Reserved: Amber (#f59e0b)
- 🔴 Sold: Red (#ef4444)

---

## 📱 Responsive Design

| Device | Grid | Columns |
|--------|------|---------|
| Desktop | 4 | cards per row |
| Tablet | 2 | cards per row |
| Mobile | 1 | card per row |

---

## ⚡ Performance

- Pagination: 12 items per page
- Image optimization via ImageKit
- Efficient database queries
- Lazy loading
- Caching headers

---

## 🧪 Testing

```
□ Create item with image
□ Browse all items
□ Search functionality works
□ Filters work correctly
□ Pagination works
□ View item details
□ Edit item (seller only)
□ Delete item (seller only)
□ Status change works
□ Non-owner cannot edit
□ Mobile responsive
□ Images display
□ Error handling
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Items not showing | Check status='available' |
| Image upload fails | Verify ImageKit config |
| Filter not working | Check query parameters |
| Can't edit item | Verify user is seller |
| Routes not working | Check App.jsx imports |
| 404 errors | Verify API endpoints |

---

## 📚 Documentation

- **Full Guide**: `ITEM_SECTION_GUIDE.md`
- **API Reference**: Backend routes section
- **Component Docs**: Inline code comments

---

## 🚀 Deploy Checklist

- [ ] Test all CRUD operations
- [ ] Verify image uploads
- [ ] Test pagination
- [ ] Check responsive design
- [ ] Validate error handling
- [ ] Test on multiple browsers
- [ ] Configure image limits
- [ ] Set proper cache headers
- [ ] Enable compression
- [ ] Monitor database

---

## 💡 Tips

1. **Use ItemService** for all API calls
2. **Handle loading/error states** in components
3. **Validate forms** before submit
4. **Check user ownership** before editing
5. **Format prices** using ItemService
6. **Use pagination** for large datasets
7. **Optimize images** on upload
8. **Cache responses** when appropriate

---

## ✨ Summary

Complete item marketplace with:
- ✅ Full CRUD operations
- ✅ Advanced search & filters
- ✅ Responsive design
- ✅ Secure operations
- ✅ Good performance
- ✅ Error handling

**Status**: Ready to Use
**Last Updated**: April 18, 2026
