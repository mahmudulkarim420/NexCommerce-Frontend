import api from "./api";

/**
 * User Service
 * Handles user profile and address management
 */

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin" | "vendor";
  avatar?: string;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault?: boolean;
}

export const userService = {
  /**
   * Get all users (Admin only)
   */
  getAllUsers: async (params?: {
    role?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    users: User[];
    total: number;
  }> => {
    const response = await api.get("/users", { params });
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data.user || response.data.data || response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data.user || response.data.data || response.data;
  },

  /**
   * Delete user (Admin only)
   */
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  /**
   * Block/Unblock user (Admin only)
   */
  toggleBlockUser: async (id: string, isBlocked: boolean): Promise<User> => {
    const response = await api.put(`/users/${id}/block`, { isBlocked });
    return response.data.user || response.data.data || response.data;
  },

  // ============================================
  // ADDRESSES
  // ============================================

  /**
   * Get user addresses
   */
  getAddresses: async (userId: string): Promise<Address[]> => {
    const response = await api.get(`/users/${userId}/addresses`);
    return response.data.addresses || response.data.data || response.data;
  },

  /**
   * Get single address
   */
  getAddressById: async (userId: string, addressId: string): Promise<Address> => {
    const response = await api.get(`/users/${userId}/addresses/${addressId}`);
    return response.data.address || response.data.data || response.data;
  },

  /**
   * Create new address
   */
  createAddress: async (userId: string, data: Partial<Address>): Promise<Address> => {
    const response = await api.post(`/users/${userId}/addresses`, data);
    return response.data.address || response.data.data || response.data;
  },

  /**
   * Update address
   */
  updateAddress: async (
    userId: string,
    addressId: string,
    data: Partial<Address>,
  ): Promise<Address> => {
    const response = await api.put(`/users/${userId}/addresses/${addressId}`, data);
    return response.data.address || response.data.data || response.data;
  },

  /**
   * Delete address
   */
  deleteAddress: async (userId: string, addressId: string): Promise<void> => {
    await api.delete(`/users/${userId}/addresses/${addressId}`);
  },

  /**
   * Set default address
   */
  setDefaultAddress: async (userId: string, addressId: string): Promise<Address> => {
    const response = await api.put(`/users/${userId}/addresses/${addressId}/default`);
    return response.data.address || response.data.data || response.data;
  },
};

export default userService;
