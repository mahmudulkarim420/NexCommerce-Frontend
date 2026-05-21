// Demo data for NexCommerce - Replace all dynamic API calls

// Demo Users
export const demoUsers = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john@example.com",
    phone: "01712345678",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    isBlocked: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "01812345678",
    role: "customer",
    avatar: "https://i.pravatar.cc/150?img=2",
    isBlocked: false,
    createdAt: "2024-02-20T14:20:00Z",
  },
  {
    _id: "user3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "01912345678",
    role: "customer",
    avatar: "https://i.pravatar.cc/150?img=3",
    isBlocked: false,
    createdAt: "2024-03-10T09:15:00Z",
  },
];

// Demo Categories
export const demoCategories = [
  {
    _id: "cat1",
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    description: "Latest gadgets and electronic devices",
    metaTitle: "Electronics - NexCommerce",
    metaDescription: "Shop the latest electronics",
    active: true,
  },
  {
    _id: "cat2",
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    description: "Trendy clothing and accessories",
    metaTitle: "Fashion - NexCommerce",
    metaDescription: "Discover trendy fashion",
    active: true,
  },
  {
    _id: "cat3",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
    description: "Essential home and kitchen appliances",
    metaTitle: "Home & Kitchen - NexCommerce",
    metaDescription: "Shop home essentials",
    active: true,
  },
  {
    _id: "cat4",
    name: "Books",
    slug: "books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    description: "Wide range of books across all genres",
    metaTitle: "Books - NexCommerce",
    metaDescription: "Explore our book collection",
    active: true,
  },
  {
    _id: "cat5",
    name: "Sports",
    slug: "sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    description: "Sports equipment and gear",
    metaTitle: "Sports - NexCommerce",
    metaDescription: "Get your sports gear",
    active: true,
  },
  {
    _id: "cat6",
    name: "Beauty",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    description: "Beauty and personal care products",
    metaTitle: "Beauty - NexCommerce",
    metaDescription: "Shop beauty products",
    active: true,
  },
];

// Demo Subcategories
export const demoSubcategories = [
  { _id: "sub1", name: "Smartphones", slug: "smartphones", categoryId: "cat1", active: true },
  { _id: "sub2", name: "Laptops", slug: "laptops", categoryId: "cat1", active: true },
  { _id: "sub3", name: "Headphones", slug: "headphones", categoryId: "cat1", active: true },
  { _id: "sub4", name: "Men's Clothing", slug: "mens-clothing", categoryId: "cat2", active: true },
  {
    _id: "sub5",
    name: "Women's Clothing",
    slug: "womens-clothing",
    categoryId: "cat2",
    active: true,
  },
  { _id: "sub6", name: "Accessories", slug: "accessories", categoryId: "cat2", active: true },
  {
    _id: "sub7",
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    categoryId: "cat3",
    active: true,
  },
  { _id: "sub8", name: "Home Decor", slug: "home-decor", categoryId: "cat3", active: true },
  { _id: "sub9", name: "Fiction", slug: "fiction", categoryId: "cat4", active: true },
  { _id: "sub10", name: "Non-Fiction", slug: "non-fiction", categoryId: "cat4", active: true },
];

// Demo Products
export const demoProducts = [
  {
    _id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 1299,
    originalPrice: 1499,
    discount: 13,
    stock: 50,
    categoryId: "cat1",
    subcategoryId: "sub1",
    images: [
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600",
      "https://images.unsplash.com/photo-1678652197838-b5d1d8c1b95a?w=600",
    ],
    rating: 4.8,
    reviews: 245,
    brand: "Apple",
    tags: ["smartphone", "5g", "premium"],
    featured: true,
    active: true,
  },
  {
    _id: "prod2",
    name: 'MacBook Pro 16"',
    slug: "macbook-pro-16",
    description: "Powerful laptop with M3 Max chip, stunning Liquid Retina XDR display",
    price: 2499,
    originalPrice: 2799,
    discount: 11,
    stock: 30,
    categoryId: "cat1",
    subcategoryId: "sub2",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    ],
    rating: 4.9,
    reviews: 189,
    brand: "Apple",
    tags: ["laptop", "professional", "m3"],
    featured: true,
    active: true,
  },
  {
    _id: "prod3",
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise canceling headphones with exceptional sound quality",
    price: 349,
    originalPrice: 399,
    discount: 13,
    stock: 100,
    categoryId: "cat1",
    subcategoryId: "sub3",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600",
    ],
    rating: 4.7,
    reviews: 567,
    brand: "Sony",
    tags: ["headphones", "wireless", "noise-canceling"],
    featured: true,
    active: true,
  },
  {
    _id: "prod4",
    name: "Men's Casual Shirt",
    slug: "mens-casual-shirt",
    description: "Premium cotton casual shirt, perfect for everyday wear",
    price: 45,
    originalPrice: 60,
    discount: 25,
    stock: 200,
    categoryId: "cat2",
    subcategoryId: "sub4",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
    ],
    rating: 4.3,
    reviews: 89,
    brand: "StyleCo",
    tags: ["shirt", "casual", "cotton"],
    featured: false,
    active: true,
  },
  {
    _id: "prod5",
    name: "Women's Summer Dress",
    slug: "womens-summer-dress",
    description: "Elegant floral summer dress, lightweight and comfortable",
    price: 79,
    originalPrice: 99,
    discount: 20,
    stock: 150,
    categoryId: "cat2",
    subcategoryId: "sub5",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
    ],
    rating: 4.6,
    reviews: 134,
    brand: "FashionHub",
    tags: ["dress", "summer", "floral"],
    featured: true,
    active: true,
  },
  {
    _id: "prod6",
    name: "Coffee Maker Pro",
    slug: "coffee-maker-pro",
    description: "Professional coffee maker with programmable settings and thermal carafe",
    price: 129,
    originalPrice: 179,
    discount: 28,
    stock: 75,
    categoryId: "cat3",
    subcategoryId: "sub7",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    ],
    rating: 4.5,
    reviews: 223,
    brand: "BrewMaster",
    tags: ["coffee", "kitchen", "appliance"],
    featured: false,
    active: true,
  },
  {
    _id: "prod7",
    name: "The Great Gatsby",
    slug: "the-great-gatsby",
    description: "Classic American novel by F. Scott Fitzgerald",
    price: 15,
    originalPrice: 20,
    discount: 25,
    stock: 500,
    categoryId: "cat4",
    subcategoryId: "sub9",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    ],
    rating: 4.8,
    reviews: 1245,
    brand: "Scribner",
    tags: ["book", "fiction", "classic"],
    featured: true,
    active: true,
  },
  {
    _id: "prod8",
    name: "Yoga Mat Premium",
    slug: "yoga-mat-premium",
    description: "Non-slip yoga mat with extra cushioning, eco-friendly material",
    price: 39,
    originalPrice: 55,
    discount: 29,
    stock: 120,
    categoryId: "cat5",
    subcategoryId: "sub1",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600",
    ],
    rating: 4.4,
    reviews: 178,
    brand: "FitLife",
    tags: ["yoga", "fitness", "mat"],
    featured: false,
    active: true,
  },
];

// Demo Orders
export const demoOrders = [
  {
    _id: "order1",
    userId: "user2",
    orderNumber: "ORD-2024-001",
    items: [
      {
        productId: "prod1",
        name: "iPhone 15 Pro Max",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=200",
      },
    ],
    subtotal: 1299,
    shipping: 0,
    tax: 129.9,
    total: 1428.9,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    shippingAddress: {
      name: "Jane Smith",
      phone: "01812345678",
      address: "123 Main Street, Dhaka",
      city: "Dhaka",
      district: "Dhaka",
      postalCode: "1200",
    },
    createdAt: "2024-04-15T10:30:00Z",
    deliveredAt: "2024-04-20T15:45:00Z",
  },
  {
    _id: "order2",
    userId: "user3",
    orderNumber: "ORD-2024-002",
    items: [
      {
        productId: "prod3",
        name: "Sony WH-1000XM5",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200",
      },
      {
        productId: "prod5",
        name: "Women's Summer Dress",
        price: 79,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
      },
    ],
    subtotal: 507,
    shipping: 50,
    tax: 50.7,
    total: 607.7,
    status: "shipped",
    paymentMethod: "cod",
    paymentStatus: "pending",
    shippingAddress: {
      name: "Mike Johnson",
      phone: "01912345678",
      address: "456 Park Avenue, Chittagong",
      city: "Chittagong",
      district: "Chittagong",
      postalCode: "4000",
    },
    createdAt: "2024-05-10T14:20:00Z",
    shippedAt: "2024-05-12T09:30:00Z",
  },
  {
    _id: "order3",
    userId: "user2",
    orderNumber: "ORD-2024-003",
    items: [
      {
        productId: "prod7",
        name: "The Great Gatsby",
        price: 15,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
      },
    ],
    subtotal: 45,
    shipping: 30,
    tax: 4.5,
    total: 79.5,
    status: "pending",
    paymentMethod: "cod",
    paymentStatus: "pending",
    shippingAddress: {
      name: "Jane Smith",
      phone: "01812345678",
      address: "123 Main Street, Dhaka",
      city: "Dhaka",
      district: "Dhaka",
      postalCode: "1200",
    },
    createdAt: "2024-05-18T11:15:00Z",
  },
];

// Demo Reviews
export const demoReviews = [
  {
    _id: "rev1",
    productId: "prod1",
    userId: "user2",
    userName: "Jane Smith",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "Excellent phone! The camera quality is amazing and the battery life is great.",
    createdAt: "2024-04-25T10:30:00Z",
  },
  {
    _id: "rev2",
    productId: "prod3",
    userId: "user3",
    userName: "Mike Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "Best noise-canceling headphones I've ever used. Worth every penny!",
    createdAt: "2024-05-15T14:20:00Z",
  },
  {
    _id: "rev3",
    productId: "prod5",
    userId: "user2",
    userName: "Jane Smith",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    comment: "Beautiful dress, fits perfectly. The fabric is very comfortable.",
    createdAt: "2024-05-16T09:45:00Z",
  },
];

// Demo Banners
export const demoHomeBanners = [
  {
    _id: "banner1",
    title: "Summer Sale 2024",
    subtitle: "Up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
    link: "/shop",
    active: true,
    order: 1,
  },
  {
    _id: "banner2",
    title: "New Electronics Collection",
    subtitle: "Latest gadgets at best prices",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200",
    link: "/shop/electronics",
    active: true,
    order: 2,
  },
  {
    _id: "banner3",
    title: "Fashion Week Special",
    subtitle: "Trendy styles for everyone",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
    link: "/shop/fashion",
    active: true,
    order: 3,
  },
];

export const demoCenterBanner = {
  _id: "center1",
  title: "Mid Season Sale",
  subtitle: "Extra 20% off on all categories",
  image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1000",
  link: "/shop",
  active: true,
};

export const demoLeftBanner = {
  _id: "left1",
  title: "Smart Watches",
  subtitle: "Starting from $199",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  link: "/shop/electronics",
  active: true,
};

export const demoRightBanner = {
  _id: "right1",
  title: "Home Essentials",
  subtitle: "Up to 40% off",
  image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
  link: "/shop/home-kitchen",
  active: true,
};

// Demo Website Info
export const demoWebsiteInfo = {
  _id: "info1",
  siteName: "NexCommerce",
  tagline: "Your one-stop online shop for everything you need",
  email: "support@nexcommerce.com",
  phone: "+880 1712-345678",
  address: "123 Commerce Street, Dhaka 1200, Bangladesh",
  number: "+880 1712-345678",
  deliveryText: "Delivery: 9 AM - 9 PM, 7 Days a Week",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  socialLinks: [
    {
      name: "Facebook",
      url: "https://facebook.com/nexcommerce",
      icon: "fa-facebook",
      active: true,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/nexcommerce",
      icon: "fa-instagram",
      active: true,
    },
    { name: "Twitter", url: "https://twitter.com/nexcommerce", icon: "fa-twitter", active: true },
    { name: "YouTube", url: "https://youtube.com/nexcommerce", icon: "fa-youtube", active: true },
  ],
  metaTitle: "NexCommerce - Best Online Shopping in Bangladesh",
  metaDescription: "Shop the latest products at the best prices. Fast delivery across Bangladesh.",
  metaKeywords: "online shopping, ecommerce, bangladesh, electronics, fashion",
};

// Demo Notifications
export const demoNotifications = [
  {
    _id: "notif1",
    title: "Order Delivered",
    message: "Your order #ORD-2024-001 has been delivered successfully",
    type: "success",
    read: false,
    createdAt: "2024-04-20T15:45:00Z",
  },
  {
    _id: "notif2",
    title: "New Offer",
    message: "Get 20% off on all electronics this weekend!",
    type: "info",
    read: false,
    createdAt: "2024-05-15T10:00:00Z",
  },
  {
    _id: "notif3",
    title: "Order Shipped",
    message: "Your order #ORD-2024-002 is on the way",
    type: "info",
    read: true,
    createdAt: "2024-05-12T09:30:00Z",
  },
];

// Demo Cart (stored in localStorage/Redux)
export const demoCart = [
  {
    productId: "prod1",
    name: "iPhone 15 Pro Max",
    price: 1299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=200",
  },
  {
    productId: "prod3",
    name: "Sony WH-1000XM5",
    price: 349,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200",
  },
];

// Demo Wishlist
export const demoWishlist = [
  {
    productId: "prod2",
    name: 'MacBook Pro 16"',
    price: 2499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200",
  },
  {
    productId: "prod5",
    name: "Women's Summer Dress",
    price: 79,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
  },
];

// Demo Addresses
export const demoAddresses = [
  {
    _id: "addr1",
    userId: "user2",
    name: "Jane Smith",
    phone: "01812345678",
    address: "123 Main Street",
    city: "Dhaka",
    district: "Dhaka",
    postalCode: "1200",
    isDefault: true,
  },
  {
    _id: "addr2",
    userId: "user2",
    name: "Jane Smith",
    phone: "01812345678",
    address: "456 Office Road",
    city: "Dhaka",
    district: "Dhaka",
    postalCode: "1205",
    isDefault: false,
  },
];

// Helper function to simulate API delay
export const simulateDelay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Helper function to get current logged in user (demo)
export const getCurrentUser = () => {
  return demoUsers[1]; // Jane Smith as default logged in user
};

// Demo Blogs
export const demoBlogs = [
  {
    _id: "blog1",
    title: "How to Choose the Right Smartphone in 2024",
    content:
      "With so many options available, choosing a smartphone can be tough. Here is our guide...",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    author: "Admin",
    createdAt: "2024-05-01T10:00:00Z",
  },
  {
    _id: "blog2",
    title: "Top 10 Kitchen Gadgets You Need",
    content: "Make your cooking experience better with these amazing kitchen tools...",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    author: "Admin",
    createdAt: "2024-05-05T12:00:00Z",
  },
];

// Demo Contact Messages
export const demoContactMessages = [
  {
    _id: "msg1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Inquiry about iPhone 15",
    message: "When will the titanium blue version be back in stock?",
    createdAt: "2024-05-10T14:30:00Z",
  },
];
