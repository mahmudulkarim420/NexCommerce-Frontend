import api from "./api";

/**
 * Category Service
 * Handles all category-related API calls
 */

export interface Category {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  categoryId: string | { _id: string; name: string };
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const categoryService = {
  /**
   * Get all categories
   */
  getAll: async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data.categories || response.data.data || response.data;
  },

  /**
   * Get single category by ID
   */
  getById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data.category || response.data.data || response.data;
  },

  /**
   * Create new category (Admin only)
   */
  create: async (data: Partial<Category>): Promise<Category> => {
    const response = await api.post("/categories", data);
    return response.data.category || response.data.data || response.data;
  },

  /**
   * Update category (Admin only)
   */
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data.category || response.data.data || response.data;
  },

  /**
   * Delete category (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

  /**
   * Get all subcategories
   */
  getAllSubcategories: async (): Promise<Subcategory[]> => {
    const response = await api.get("/subcategories");
    return response.data.subcategories || response.data.data || response.data;
  },

  /**
   * Get subcategories by category ID
   */
  getSubcategoriesByCategory: async (categoryId: string): Promise<Subcategory[]> => {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data.subcategories || response.data.data || response.data;
  },

  /**
   * Create new subcategory (Admin only)
   */
  createSubcategory: async (data: Partial<Subcategory>): Promise<Subcategory> => {
    const response = await api.post("/subcategories", data);
    return response.data.subcategory || response.data.data || response.data;
  },

  /**
   * Update subcategory (Admin only)
   */
  updateSubcategory: async (id: string, data: Partial<Subcategory>): Promise<Subcategory> => {
    const response = await api.put(`/subcategories/${id}`, data);
    return response.data.subcategory || response.data.data || response.data;
  },

  /**
   * Delete subcategory (Admin only)
   */
  deleteSubcategory: async (id: string): Promise<void> => {
    await api.delete(`/subcategories/${id}`);
  },
};

export default categoryService;
