# NexCommerce - Demo Data Implementation

## Overview

All dynamic API calls have been replaced with demo data to allow the application to run without a backend server. This makes it perfect for demonstrations, testing, and development.

## What Changed

### 1. Demo Data File

**Location:** `src/data/demoData.js`

This file contains all the demo data including:

- **Users** (3 demo users including admin and customers)
- **Categories** (6 categories: Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty)
- **Subcategories** (10 subcategories mapped to categories)
- **Products** (8 demo products with full details)
- **Orders** (3 demo orders with different statuses)
- **Reviews** (3 product reviews)
- **Banners** (Home slider, center, left, and right banners)
- **Website Info** (Site configuration and social links)
- **Notifications** (3 demo notifications)
- **Addresses** (2 demo addresses)
- **Cart & Wishlist** (Demo cart and wishlist items)

### 2. Updated Files

#### Authentication & User Management

- `src/hook/useAuth.jsx` - All auth functions now use demo data
  - Signup, Signin, Logout
  - OTP send/verify
  - Password reset
  - Google signin
  - User profile management
  - Address management

#### Products

- `src/hook/useProduct.jsx` - Product CRUD operations
- `src/utlis/userProduct.jsx` - Product fetching hook
- `src/utlis/useSearchProduct.jsx` - Product search with demo data

#### Categories & Subcategories

- `src/hook/usecategory.jsx` - Category CRUD operations
- `src/hook/useSubcategory.jsx` - Subcategory operations
- `src/utlis/usecategory.jsx` - Category fetching hook
- `src/utlis/useSubcategory.jsx` - Subcategory fetching hook
- `src/utlis/useCategoryWithSubcategories.jsx` - Combined category/subcategory data

#### Banners

- `src/hook/useHomeBanner.jsx` - Home slider banners
- `src/hook/useCernterBanner.jsx` - Center banner
- `src/hook/useLeftBanner.jsx` - Left sidebar banner
- `src/hook/userRightBanner.jsx` - Right sidebar banner
- `src/utlis/useHomeBanner.jsx` - Home banner fetching

#### Orders

- `src/utlis/useOrder.jsx` - Order management (create, update, delete, fetch)

#### Other Features

- `src/utlis/useWebsiteInfo.jsx` - Website configuration
- `src/utlis/useNotificationsGet.jsx` - Notifications
- `src/utlis/useGetUser.jsx` - Current user data
- `src/utlis/useGetAllUser.jsx` - All users (admin)

## Features

### Simulated API Delays

All functions include realistic delays (300-1000ms) to simulate network requests:

```javascript
await simulateDelay(800); // Simulates 800ms API call
```

### Current Demo User

The default logged-in user is **Jane Smith** (user2):

- Email: jane@example.com
- Role: customer
- Has 2 orders and 2 addresses

### Admin User

**John Doe** (user1) is the admin user:

- Email: john@example.com
- Role: admin
- Can access all admin features

## How to Use

### 1. Authentication

```javascript
// Login (accepts any credentials)
await UserSignin({ email: "any@email.com", password: "any" }, router, dispatch);

// The demo will log you in as Jane Smith
```

### 2. Products

```javascript
// Get all products
const { product, loading, error } = useProduct();

// Search products
const { data, loading } = useSearchProduct({ search: "iphone", page: 1, limit: 10 });

// Create product (admin)
await ProductCreate({
  name: "New Product",
  price: 99,
  stock: 50,
  categoryId: "cat1",
});
```

### 3. Orders

```javascript
// Create order
await OrderCreate({
  items: [...],
  total: 1299,
  shippingAddress: {...}
});

// Get my orders
const orders = await OrderAllGet();

// Update order status (admin)
await OrderUpdate("order1", "shipped");
```

### 4. Categories

```javascript
// Get all categories
const { category, loading } = useCategory();

// Create category (admin)
await CategoryCreate({
  name: "New Category",
  description: "Category description",
});
```

## Demo Data Details

### Products

- 8 products across different categories
- Includes: iPhone 15 Pro Max, MacBook Pro, Sony Headphones, Clothing, Books, etc.
- All products have images, prices, ratings, and reviews

### Orders

- **Order 1**: Delivered (iPhone 15 Pro Max)
- **Order 2**: Shipped (Headphones + Dress)
- **Order 3**: Pending (Books)

### Categories

1. Electronics (Smartphones, Laptops, Headphones)
2. Fashion (Men's & Women's Clothing, Accessories)
3. Home & Kitchen (Appliances, Decor)
4. Books (Fiction, Non-Fiction)
5. Sports
6. Beauty

## Modifying Demo Data

### Adding New Products

Edit `src/data/demoData.js`:

```javascript
export const demoProducts = [
  ...existing products,
  {
    _id: "prod9",
    name: "Your Product",
    price: 199,
    // ... other fields
  }
];
```

### Adding New Users

```javascript
export const demoUsers = [
  ...existing users,
  {
    _id: "user4",
    name: "New User",
    email: "newuser@example.com",
    role: "customer"
  }
];
```

## Important Notes

1. **Data Persistence**: Demo data is stored in memory and will reset on page refresh
2. **Images**: All product images use Unsplash URLs
3. **IDs**: All IDs are strings (e.g., "prod1", "user2", "cat1")
4. **Timestamps**: Created/updated timestamps are ISO strings
5. **No Backend Required**: The app runs completely in the browser

## Testing Features

### Test User Login

- Any email/password combination will log you in as Jane Smith
- OTP verification accepts any code

### Test Admin Features

- Change `getCurrentUser()` to return `demoUsers[0]` for admin access
- Admin can create/update/delete products, categories, orders

### Test Orders

- Create orders with demo products
- Update order status (pending → shipped → delivered)
- View order history

### Test Search

- Search works across product names, descriptions, brands, and tags
- Try: "iphone", "sony", "dress", "book"

## Reverting to API Calls

To switch back to real API calls:

1. Restore the original files from git history
2. Or replace demo data imports with axios calls
3. Update `UrlBackend` in `src/confic/urlExport.jsx`

## Support

For questions or issues with demo data:

1. Check `src/data/demoData.js` for available data
2. Verify function signatures match original API
3. Check console for error messages

---

**Note**: This demo implementation is for development and demonstration purposes. For production, connect to a real backend API.
