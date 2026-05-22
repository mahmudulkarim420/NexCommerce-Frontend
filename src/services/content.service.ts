import api from "./api";

/**
 * Content Service
 * Handles banners, blogs, website info, and other content-related API calls
 */

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  active: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface WebsiteInfo {
  _id: string;
  siteName: string;
  tagline?: string;
  email: string;
  phone: string;
  number?: string;
  address?: string;
  deliveryText?: string;
  offerText?: string;
  countdownTargetDate?: string;
  logo?: string;
  favicon?: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
    active: boolean;
  }>;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const DEFAULT_WEBSITE_INFO: WebsiteInfo = {
  _id: "default",
  siteName: "NexCommerce",
  email: "contact@nexcommerce.com",
  phone: "+8801700000000",
  number: "+8801700000000",
  address: "Dhaka, Bangladesh",
  countdownTargetDate: "2026-12-31",
};

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category?: string;
  tags?: string[];
  active?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read?: boolean;
  createdAt: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  read: boolean;
  userId?: string;
  createdAt: string;
}

export const contentService = {
  // ============================================
  // BANNERS
  // ============================================

  /**
   * Get all home banners
   */
  getHomeBanners: async (): Promise<Banner[]> => {
    const response = await api.get("/banners/home");
    return response.data.banners || response.data.data || response.data;
  },

  /**
   * Get center banner
   */
  getCenterBanner: async (): Promise<Banner> => {
    const response = await api.get("/banners/center");
    return response.data.banner || response.data.data || response.data;
  },

  /**
   * Get left banner
   */
  getLeftBanner: async (): Promise<Banner> => {
    const response = await api.get("/banners/left");
    return response.data.banner || response.data.data || response.data;
  },

  /**
   * Get right banner
   */
  getRightBanner: async (): Promise<Banner> => {
    const response = await api.get("/banners/right");
    return response.data.banner || response.data.data || response.data;
  },

  /**
   * Create banner (Admin only)
   */
  createBanner: async (type: string, data: Partial<Banner>): Promise<Banner> => {
    const response = await api.post(`/banners/${type}`, data);
    return response.data.banner || response.data.data || response.data;
  },

  /**
   * Update banner (Admin only)
   */
  updateBanner: async (id: string, data: Partial<Banner>): Promise<Banner> => {
    const response = await api.put(`/banners/${id}`, data);
    return response.data.banner || response.data.data || response.data;
  },

  /**
   * Delete banner (Admin only)
   */
  deleteBanner: async (id: string): Promise<void> => {
    await api.delete(`/banners/${id}`);
  },

  // ============================================
  // WEBSITE INFO
  // ============================================

  /**
   * Get website information
   */
  getWebsiteInfo: async (): Promise<WebsiteInfo> => {
    try {
      const response = await api.get("/website-info");
      return response.data.info || response.data.data || response.data;
    } catch (error) {
      console.warn("Website info API is unavailable, using fallback data.", error);
      return DEFAULT_WEBSITE_INFO;
    }
  },

  /**
   * Update website information (Admin only)
   */
  updateWebsiteInfo: async (data: Partial<WebsiteInfo>): Promise<WebsiteInfo> => {
    const response = await api.put("/website-info", data);
    return response.data.info || response.data.data || response.data;
  },

  // ============================================
  // BLOGS
  // ============================================

  /**
   * Get all blogs
   */
  getBlogs: async (params?: {
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    blogs: Blog[];
    total: number;
  }> => {
    const response = await api.get("/blogs", { params });
    return response.data;
  },

  /**
   * Get single blog by ID
   */
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data.blog || response.data.data || response.data;
  },

  /**
   * Create blog (Admin only)
   */
  createBlog: async (data: Partial<Blog>): Promise<Blog> => {
    const response = await api.post("/blogs", data);
    return response.data.blog || response.data.data || response.data;
  },

  /**
   * Update blog (Admin only)
   */
  updateBlog: async (id: string, data: Partial<Blog>): Promise<Blog> => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data.blog || response.data.data || response.data;
  },

  /**
   * Delete blog (Admin only)
   */
  deleteBlog: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },

  // ============================================
  // CONTACT MESSAGES
  // ============================================

  /**
   * Submit contact message
   */
  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage> => {
    const response = await api.post("/contact", data);
    return response.data.message || response.data.data || response.data;
  },

  /**
   * Get all contact messages (Admin only)
   */
  getContactMessages: async (): Promise<ContactMessage[]> => {
    const response = await api.get("/contact");
    return response.data.messages || response.data.data || response.data;
  },

  /**
   * Delete contact message (Admin only)
   */
  deleteContactMessage: async (id: string): Promise<void> => {
    await api.delete(`/contact/${id}`);
  },

  // ============================================
  // NOTIFICATIONS
  // ============================================

  /**
   * Get user notifications
   */
  getNotifications: async (userId?: string): Promise<Notification[]> => {
    const url = userId ? `/notifications/${userId}` : "/notifications";
    const response = await api.get(url);
    return response.data.notifications || response.data.data || response.data;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: string): Promise<void> => {
    await api.put(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (userId: string): Promise<void> => {
    await api.put(`/notifications/${userId}/read-all`);
  },

  /**
   * Delete notification
   */
  deleteNotification: async (notificationId: string): Promise<void> => {
    await api.delete(`/notifications/${notificationId}`);
  },

  /**
   * Create notification (Admin only)
   */
  createNotification: async (data: Partial<Notification>): Promise<Notification> => {
    const response = await api.post("/notifications", data);
    return response.data.notification || response.data.data || response.data;
  },
};

export default contentService;
