"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Sparkles, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "@/src/components/loading/CustomLoader";

// Import hooks
import { addToCartApi } from "../../hook/useCart";
import { addToWishlistApi, getWishlistApi, removeFromWishlistApi } from "../../hook/useWishlist";
import { useGetcategory } from "../../utils/usecategory";
import { useGetProduct } from "../../utils/userProduct";
import { useCategoryWithSubcategories } from "../../utils/useCategoryWithSubcategories";

// Helper function to determine if product is new
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
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const PopularProducts = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [localWishlist, setLocalWishlist] = useState<Set<string>>(new Set());

  const dispatch = useDispatch();
  const { data: wishlistItems } = useSelector((state: any) => state?.wishlist?.data);
  const user = useSelector((state: any) => state.user.data);

  const productParams = useMemo(() => ({ page: 1, limit: 1000, search: "" }), []);

  // Fetch data dynamically
  const { loading: categoryLoading } = useGetcategory();
  const { product, loading: productLoading } = useGetProduct(productParams);

  // Fetch categories and subcategories
  const {
    categories: shopCategories,
    loading: shopCategoriesLoading,
  } = useCategoryWithSubcategories();

  // Fetch wishlist once
  useEffect(() => {
    getWishlistApi(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setLocalWishlist(new Set((wishlistItems || []).map((item: { id: string }) => item.id)));
  }, [wishlistItems]);

  const loading = categoryLoading || productLoading || shopCategoriesLoading;

  // Merge structured dataset
  const mergedData = useMemo(() => {
    if (!product || !shopCategories) return { products: [], categories: [] };

    const categories = shopCategories.map((c: { name: string; icon: string; color: string }) => ({
      id: c.name?.toUpperCase(),
      name: c.name?.toUpperCase(),
      icon: c.icon || "",
      color: c.color || "from-slate-500 to-gray-600",
    }));

    const products = product.map((p: {
      _id: string;
      id: string;
      name: string;
      productName: string;
      title: string;
      images: string[];
      image: string;
      price: number;
      oldPrice: number;
      ratings: number;
      reviews: number;
      category: string | string[] | { name: string };
      subCategory: string | string[] | { name: string };
      tags: string[];
      createdAt: string;
      created_at: string;
      createdDate: string;
      discount: number;
    }) => {
      let categoryName = "GENERAL";
      if (Array.isArray(p.category) && p.category.length > 0) {
        const cat = p.category[0];
        categoryName = (typeof cat === "string" ? cat : (cat as { name?: string })?.name)?.toUpperCase() || "GENERAL";
      } else if (typeof p.category === "object" && p.category && "name" in p.category) {
        categoryName = (p.category as { name?: string }).name?.toUpperCase() || "GENERAL";
      } else if (typeof p.category === "string") {
        categoryName = p.category.toUpperCase();
      }

      let subCategoryName = null;
      if (Array.isArray(p.subCategory) && p.subCategory.length > 0) {
        const subCat = p.subCategory[0];
        subCategoryName =
          (typeof subCat === "string" ? subCat : (subCat as { name?: string })?.name)?.toUpperCase() || null;
      } else if (typeof p.subCategory === "object" && p.subCategory && "name" in p.subCategory) {
        subCategoryName = (p.subCategory as { name?: string }).name?.toUpperCase() || null;
      } else if (typeof p.subCategory === "string") {
        subCategoryName = p.subCategory.toUpperCase();
      }

      return {
        id: p._id || p.id,
        name: p.name || p.productName || p.title || "Product",
        image: p.images?.[0] || p.image || null,
        price: p.price,
        originalPrice: p.oldPrice || p.price,
        rating: p.ratings,
        reviews: p.reviews,
        category: categoryName,
        subCategory: subCategoryName,
        badge: p.tags?.[0] || "New",
        isNew: isProductNew(p.createdAt || p.created_at || p.createdDate),
        discount:
          p.discount ||
          (p.oldPrice && p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0),
      };
    });

    return { products, categories };
  }, [product, shopCategories]);

  const currentProducts = useMemo(() => {
    if (activeCategory === "ALL") {
      const productsByCategory: Record<string, Record<string, typeof mergedData.products>> = {};

      mergedData.products.forEach((p) => {
        if (!productsByCategory[p.category]) {
          productsByCategory[p.category] = {};
        }

        const subCatKey = p.subCategory || "NO_SUBCATEGORY";
        if (!productsByCategory[p.category][subCatKey]) {
          productsByCategory[p.category][subCatKey] = [];
        }
        productsByCategory[p.category][subCatKey].push(p);
      });

      const result: typeof mergedData.products = [];
      Object.keys(productsByCategory).forEach((catName) => {
        const subcategories = productsByCategory[catName];
        Object.keys(subcategories).forEach((subCatName) => {
          const productsInSubCat = subcategories[subCatName];
          result.push(...productsInSubCat.slice(0, 5));
        });
      });

      return result;
    }

    const categoryProducts = mergedData.products.filter((p) => p.category === activeCategory);

    const productsBySubCategory: Record<string, typeof mergedData.products> = {};
    categoryProducts.forEach((p) => {
      const subCatKey = p.subCategory || "NO_SUBCATEGORY";
      if (!productsBySubCategory[subCatKey]) {
        productsBySubCategory[subCatKey] = [];
      }
      productsBySubCategory[subCatKey].push(p);
    });

    const result: typeof mergedData.products = [];
    Object.keys(productsBySubCategory).forEach((subCatName) => {
      const productsInSubCat = productsBySubCategory[subCatName];
      result.push(...productsInSubCat.slice(0, 5));
    });

    return result;
  }, [mergedData.products, activeCategory]);

  const filteredProducts = useMemo(() => {
    return currentProducts.slice(0, 12);
  }, [currentProducts]);

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
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to add to cart";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black">
        <CustomLoader size="large" message="Loading products..." />
      </div>
    );
  }

  return (
    <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-gray-400 text-sm">Trending Now</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Products</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most loved items, handpicked for quality and style
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "ALL"
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            All Products
          </button>
          {mergedData.categories.slice(0, 5).map((cat: { id: string; name: string }) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {filteredProducts.map((product: {
            id: string;
            image: string;
            name: string;
            isNew: boolean;
            badge: string;
            discount: number;
            rating: number;
            reviews: number;
            price: number;
            originalPrice: number;
          }) => (
            <motion.div key={product.id} variants={itemVariants}>
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
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Price */}
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
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
};

// Helper functions
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

export default PopularProducts;
