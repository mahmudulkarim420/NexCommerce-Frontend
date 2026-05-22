import api from "./api";

/**
 * Order Service
 * Handles all order-related API calls
 */

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "card" | "cod" | "bkash" | "nagad";
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
}

export const orderService = {
  /**
   * Get all orders for a user
   */
  getAll: async (userId: string): Promise<Order[]> => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data.orders || response.data.data || response.data;
  },

  /**
   * Get all orders (Admin only)
   */
  getAllOrders: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }> => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  /**
   * Get single order by ID
   */
  getById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.order || response.data.data || response.data;
  },

  /**
   * Create new order
   */
  create: async (data: CreateOrderData): Promise<Order> => {
    const response = await api.post("/orders", data);
    return response.data.order || response.data.data || response.data;
  },

  /**
   * Update order status (Admin only)
   */
  updateStatus: async (orderId: string, status: Order["status"]): Promise<Order> => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data.order || response.data.data || response.data;
  },

  /**
   * Cancel order
   */
  cancel: async (orderId: string): Promise<Order> => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data.order || response.data.data || response.data;
  },

  /**
   * Track order
   */
  track: async (orderNumber: string): Promise<Order> => {
    const response = await api.get(`/orders/track/${orderNumber}`);
    return response.data.order || response.data.data || response.data;
  },
};

export default orderService;
