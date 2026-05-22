"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
  Eye,
  Search,
  Grid3X3,
  LayoutList,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "@/src/components/loading/CustomLoader";

import { addToCartApi, getCartApi } from "../../hook/useCart";
import { addToWishlistApi, getWishlistApi, removeFromWishlistApi } from "../../hook/useWishlist";
import { useGetcategory } from "../../utils/usecategory";
import { useGetProduct } from "../../utils/userProduct";
import { useCategoryWithSubcategories } from "../../utils/useCategoryWithSubcategories";

const isProductNew = (createdDate: string | number | Date | undefined) => {
  if (!createdDate) return true;
  const created = new Date(createdDate);
  const now = new Date();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return created > monthAgo;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // easeOut cubic-bezier
    },
  },
};

function ShopComponent() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [localWishlist, setLocalWishlist] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const { data: wishlistItems } = useSelector((state: any) => state?.wishlist?.data);
  const user = useSelector((state: any) => state.user.data);

  const productParams = useMemo(() => ({ page: 1, limit: 1000, search: "" }), []);

  const { loading: categoryLoading } = useGetcategory();
  const { product, loading: productLoading } = useGetProduct(productParams);
  const { categories: shopCategories, loading: shopCategoriesLoading } =
    useCategoryWithSubcategories();

  useEffect(() => {
    getWishlistApi(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setLocalWishlist(new Set((wishlistItems || []).map((item: { id: string }) => item.id)));
  }, [wishlistItems]);

  useEffect(() => {
    if (user?._id) {
      getCartApi(user._id, dispatch);
    }
  }, [user, dispatch]);

  const loading = categoryLoading || productLoading || shopCategoriesLoading;

  const processedProducts = useMemo(() => {
    if (!product) return [];

    return product.map((p: any) => {
      const discount =
        p.oldPrice && p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

      return {
        id: p._id || p.id,
        name: p.name || p.productName || p.title || "Product",
        image: p.images?.[0] || p.image || "/placeholder.png",
        price: p.price || 0,
        originalPrice: p.oldPrice || p.price || 0,
        rating: p.ratings || 0,
        reviews: p.reviews || 0,
        category: p.category?.name || p.category || "General",
        isNew: isProductNew(p.createdAt || p.created_at),
        discount,
        badge: p.tags?.[0] || (discount > 0 ? "SALE" : "NEW"),
      };
    });
  }, [product]);

  const filteredProducts = useMemo(() => {
    let result = [...processedProducts];

    if (searchQuery) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (activeCategory !== "ALL") {
      result = result.filter((p) => p.category.toUpperCase() === activeCategory.toUpperCase());
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [processedProducts, searchQuery, activeCategory, sortBy]);

  const categories = useMemo(() => {
    if (!shopCategories) return [];
    return [
      { id: "ALL", name: "All Categories" },
      ...shopCategories.map((c: { name: string }) => ({
        id: c.name.toUpperCase(),
        name: c.name,
      })),
    ];
  }, [shopCategories]);

  const toggleWishlist = async (id: string) => {
    setLocalWishlist((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });

    try {
      const isInWishlist = localWishlist.has(id);
      if (isInWishlist) {
        await removeFromWishlistApi(id, dispatch);
      } else {
        await addToWishlistApi(id, dispatch);
      }
      await getWishlistApi(dispatch);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  const handleAddToCart = async (product: { id: string; name: string; price: number }) => {
    if (!user?._id) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    try {
      await addToCartApi(
        {
          userId: user._id,
          productId: product.id,
          quantity: 1,
          price: product.price,
        },
        dispatch,
      );
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to add to cart";
      toast.error(msg);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black">
        <CustomLoader size="large" message="Loading products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Banner */}
      <div className="relative bg-black py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400 text-sm">Discover Amazing Products</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Collection
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Find the perfect products for your lifestyle from our curated selection
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="appearance-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-amber-500/50 pr-10 cursor-pointer"
                >
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id} className="bg-black">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-amber-500/50 pr-10 cursor-pointer"
                >
                  <option value="featured" className="bg-black">
                    Featured
                  </option>
                  <option value="newest" className="bg-black">
                    Newest
                  </option>
                  <option value="price-low" className="bg-black">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-black">
                    Price: High to Low
                  </option>
                  <option value="rating" className="bg-black">
                    Highest Rated
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-amber-500 text-black" : "text-gray-400 hover:text-white"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all duration-300 ${viewMode === "list" ? "bg-amber-500 text-black" : "text-gray-400 hover:text-white"}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
            <span>Showing {filteredProducts.length} products</span>
            {activeCategory !== "ALL" && (
              <button
                onClick={() => setActiveCategory("ALL")}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product: any) => (
              <motion.div key={product.id} variants={itemVariants}>
                {viewMode === "grid" ? (
                  <ProductGridCard
                    product={product}
                    toggleWishlist={toggleWishlist}
                    handleAddToCart={handleAddToCart}
                    localWishlist={localWishlist}
                    renderStars={renderStars}
                  />
                ) : (
                  <ProductListCard
                    product={product}
                    toggleWishlist={toggleWishlist}
                    handleAddToCart={handleAddToCart}
                    localWishlist={localWishlist}
                    renderStars={renderStars}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Grid Card Component
function ProductGridCard({
  product,
  toggleWishlist,
  handleAddToCart,
  localWishlist,
  renderStars,
}: any) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              localWishlist.has(product.id)
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Heart className={`w-4 h-4 ${localWishlist.has(product.id) ? "fill-current" : ""}`} />
          </button>
          <Link
            href={`/productdetails/${product.id}`}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-amber-400">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// List Card Component
function ProductListCard({
  product,
  toggleWishlist,
  handleAddToCart,
  localWishlist,
  renderStars,
}: any) {
  return (
    <div className="group flex flex-col md:flex-row gap-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 p-4">
      {/* Image */}
      <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-2">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400">{product.category}</p>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
          <div className="text-right">
            <span className="text-2xl font-bold text-amber-400">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="block text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                localWishlist.has(product.id)
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 ${localWishlist.has(product.id) ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => handleAddToCart(product)}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopComponent;
