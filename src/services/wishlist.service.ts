import api from "./api";

/**
 * Wishlist Service
 * Handles all wishlist-related API calls
 */

export interface WishlistItem {
  _id?: string;
  id?: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

export interface Wishlist {
  _id?: string;
  userId: string;
  items: WishlistItem[];
  createdAt?: string;
  updatedAt?: string;
}

export const wishlistService = {
  /**
   * Get user's wishlist
   */
  getWishlist: async (userId: string): Promise<Wishlist> => {
    const response = await api.get(`/wishlist/${userId}`);
    return response.data.wishlist || response.data.data || response.data;
  },

  /**
   * Add item to wishlist
   */
  addItem: async (userId: string, productId: string): Promise<Wishlist> => {
    const response = await api.post("/wishlist/add", { userId, productId });
    return response.data.wishlist || response.data.data || response.data;
  },

  /**
   * Remove item from wishlist
   */
  removeItem: async (userId: string, productId: string): Promise<Wishlist> => {
    const response = await api.delete(`/wishlist/${userId}/item/${productId}`);
    return response.data.wishlist || response.data.data || response.data;
  },

  /**
   * Clear entire wishlist
   */
  clearWishlist: async (userId: string): Promise<void> => {
    await api.delete(`/wishlist/${userId}`);
  },

  /**
   * Check if product is in wishlist
   */
  isInWishlist: async (userId: string, productId: string): Promise<boolean> => {
    const response = await api.get(`/wishlist/${userId}/check/${productId}`);
    return response.data.isInWishlist || false;
  },
};

export default wishlistService;
