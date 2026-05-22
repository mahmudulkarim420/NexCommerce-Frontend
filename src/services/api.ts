import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import toast from "react-hot-toast";

/**
 * Global API Client
 * Centralized axios instance for all backend API calls
 */

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api",
  withCredentials: true, // Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request Interceptor
 * Attaches authentication token to every request
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Try to get token from localStorage first, then cookies
    let token: string | null = null;

    // Check localStorage
    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");

      // If not in localStorage, try to get from cookies
      if (!token) {
        const cookies = document.cookie.split(";");
        const authCookie = cookies.find((cookie) => cookie.trim().startsWith("authToken="));
        if (authCookie) {
          token = authCookie.split("=")[1];
        }
      }
    }

    // Attach token to Authorization header if it exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handles global error responses, especially 401 Unauthorized
 *
 * NOTE: Automatic redirect to /signin is DISABLED for Better Auth migration
 */
api.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear auth data
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");

        // Clear auth cookie
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Show user-friendly message
        toast.error("Session expired. Please sign in again.");

        // DISABLED: Automatic redirect for Better Auth migration
        // TODO: Re-enable after Better Auth is implemented
        // setTimeout(() => {
        //   window.location.href = "/signin";
        // }, 1500);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      toast.error("Access denied. You do not have permission to perform this action.");
    }

    // Handle 404 Not Found
    // DISABLED: Too aggressive, causes issues during development
    // if (error.response?.status === 404) {
    //   toast.error("Resource not found.");
    // }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    }

    // Handle network errors
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  },
);

/**
 * Helper function to set auth token
 * Call this after successful login
 */
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    // Also set as cookie for SSR scenarios
    document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  }
};

/**
 * Helper function to clear auth token
 * Call this on logout
 */
export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

/**
 * Helper function to get current auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export default api;
