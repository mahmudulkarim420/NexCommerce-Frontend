import api from "./api";

/**
 * Product Service
 * Handles all product-related API calls
 */

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  categoryId: string;
  subcategoryId?: string;
  images: string[];
  rating?: number;
  reviews?: number;
  brand?: string;
  tags?: string[];
  featured?: boolean;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  success: boolean;
  data?: Product[];
  products?: Product[];
  product?: Product;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export const productService = {
  /**
   * Get all products - Fixed to use correct backend endpoint
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ProductResponse> => {
    const response = await api.post("/products/get", {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search || "",
    });
    return {
      success: response.data.success,
      products: response.data.data || response.data.products || [],
      data: response.data.data || response.data.products || [],
      total: response.data.totalCount || 0,
      message: response.data.message,
    };
  },

  /**
   * Get single product by ID - Fixed to use correct backend endpoint
   */
  getById: async (id: string): Promise<Product> => {
    const response = await api.post(`/products/get-product-details/${id}`);
    return response.data.data || response.data.product || response.data;
  },

  /**
   * Search products - Fixed to use correct backend endpoint
   */
  search: async (
    query: string,
    params?: { page?: number; limit?: number },
  ): Promise<ProductResponse> => {
    const response = await api.post("/products/search-product", {
      search: query,
      page: params?.page || 1,
      limit: params?.limit || 10,
    });
    return {
      success: response.data.success,
      products: response.data.data || response.data.products || [],
      data: response.data.data || response.data.products || [],
      total: response.data.totalCount || 0,
      message: response.data.message,
    };
  },

  /**
   * Get products by category - Fixed to use correct backend endpoint
   */
  getByCategory: async (categoryId: string): Promise<ProductResponse> => {
    const response = await api.post(`/products/get-product-by-category`, {
      categoryId,
    });
    return {
      success: response.data.success,
      products: response.data.data || response.data.products || [],
      data: response.data.data || response.data.products || [],
      total: response.data.totalCount || 0,
      message: response.data.message,
    };
  },

  /**
   * Get featured products
   */
  getFeatured: async (): Promise<ProductResponse> => {
    const response = await api.post("/products/get", {
      featured: true,
      limit: 100,
    });
    return {
      success: response.data.success,
      products: response.data.data || response.data.products || [],
      data: response.data.data || response.data.products || [],
      message: response.data.message,
    };
  },

  /**
   * Create new product (Admin only)
   */
  create: async (data: Partial<Product>): Promise<Product> => {
    const response = await api.post("/products/create", data);
    return response.data.product || response.data.data || response.data;
  },

  /**
   * Update product (Admin only)
   */
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/update-product-details`, {
      _id: id,
      ...data,
    });
    return response.data.product || response.data.data || response.data;
  },

  /**
   * Delete product (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/delete-product`, { data: { _id: id } });
  },
};

export default productService;
