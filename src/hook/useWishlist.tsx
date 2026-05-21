// src/hook/useWishlist.js
import { demoWishlist, simulateDelay } from "../data/demoData";
import {
  wishlistAdd,
  wishlistClear,
  wishlistError,
  wishlistLoading,
  wishlistSet,
} from "../redux/wishlistSlice";

// ✅ Get all wishlist products
export const getWishlistApi = async (dispatch) => {
  try {
    dispatch(wishlistLoading());
    await simulateDelay(600);

    const formatted = demoWishlist.map((item) => {
      return {
        id: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        discount: 10, // Demo discount
        rating: 4.5,
        inStock: true,
        category: "General",
        originalPrice: Math.round(item.price / 0.9),
        addedAt: new Date().toISOString(),
      };
    });

    dispatch(wishlistSet(formatted));
  } catch (error) {
    console.error("Get wishlist error:", error);
    dispatch(wishlistError("Failed to load wishlist"));
  }
};

// ✅ Add product to wishlist
export const addToWishlistApi = async (productId, dispatch) => {
  try {
    dispatch(wishlistLoading());
    await simulateDelay(500);

    const newItem = {
      productId: productId,
      name: "Demo Product",
      price: 100,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
    };

    demoWishlist.push(newItem);
    dispatch(wishlistAdd(newItem));
  } catch (error) {
    console.error("Add wishlist error:", error);
    dispatch(wishlistError("Add failed"));
  }
};

export const removeFromWishlistApi = async (productId, dispatch) => {
  try {
    dispatch(wishlistLoading());
    await simulateDelay(500);

    const index = demoWishlist.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      demoWishlist.splice(index, 1);
    }

    await getWishlistApi(dispatch);
  } catch (error) {
    console.error("Remove wishlist error:", error);
    dispatch(wishlistError("Remove failed"));
  }
};

// ✅ Clear wishlist
export const clearWishlistApi = async (dispatch) => {
  try {
    await simulateDelay(500);
    demoWishlist.length = 0;
    dispatch(wishlistClear());
  } catch (error) {
    console.error("Clear wishlist error:", error);
    dispatch(wishlistError("Clear failed"));
  }
};
