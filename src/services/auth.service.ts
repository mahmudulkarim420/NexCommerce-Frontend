import api, { setAuthToken, clearAuthToken } from "./api";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    avatar?: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication Service Object
 */
export const authService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);

    // Store token if login successful
    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  },

  /**
   * Register new user
   */
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post("/auth/signup", data);

    // Store token if signup successful
    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear token locally, even if API call fails
      clearAuthToken();
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (
    oldPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> => {
    const response = await api.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post("/auth/refresh-token");

    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  },
};

export default authService;
