import api from "./api";

/**
 * Cart Service
 * Handles all cart-related API calls
 */

export interface CartItem {
  _id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock?: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  total?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const cartService = {
  /**
   * Get user's cart
   */
  getCart: async (userId: string): Promise<Cart> => {
    const response = await api.get(`/cart/${userId}`);
    return response.data.cart || response.data.data || response.data;
  },

  /**
   * Add item to cart
   */
  addItem: async (data: {
    userId: string;
    productId: string;
    quantity: number;
    price: number;
  }): Promise<Cart> => {
    const response = await api.post("/cart/add", data);
    return response.data.cart || response.data.data || response.data;
  },

  /**
   * Update cart item quantity
   */
  updateItem: async (data: {
    userId: string;
    productId: string;
    quantity: number;
  }): Promise<Cart> => {
    const response = await api.put("/cart/update", data);
    return response.data.cart || response.data.data || response.data;
  },

  /**
   * Remove item from cart
   */
  removeItem: async (userId: string, productId: string): Promise<Cart> => {
    const response = await api.delete(`/cart/${userId}/item/${productId}`);
    return response.data.cart || response.data.data || response.data;
  },

  /**
   * Clear entire cart
   */
  clearCart: async (userId: string): Promise<void> => {
    await api.delete(`/cart/${userId}`);
  },

  /**
   * Increase product quantity
   */
  increaseQuantity: async (userId: string, productId: string): Promise<Cart> => {
    const response = await api.post("/cart/increase", { userId, productId });
    return response.data.cart || response.data.data || response.data;
  },

  /**
   * Decrease product quantity
   */
  decreaseQuantity: async (userId: string, productId: string): Promise<Cart> => {
    const response = await api.post("/cart/decrease", { userId, productId });
    return response.data.cart || response.data.data || response.data;
  },
};

export default cartService;
