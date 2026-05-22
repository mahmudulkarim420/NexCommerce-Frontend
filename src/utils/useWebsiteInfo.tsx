"use client";
import { useCallback, useEffect, useState } from "react";
import { contentService } from "../services/content.service";

// Fallback default website info when API is not available
const DEFAULT_WEBSITE_INFO = {
  _id: "default",
  siteName: "NexCommerce",
  tagline: "Your one-stop online shop for everything you need",
  email: "contact@nexcommerce.com",
  phone: "+8801700000000",
  number: "+8801700000000",
  address: "Dhaka, Bangladesh",
  deliveryText: "We deliver everyday from 7:00 to 22:00",
  offerText: "FREE delivery & 40% Discount for next 3 orders!",
  countdownTargetDate: "2026-12-31T23:59:59Z",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  metaTitle: "NexCommerce - Best Online Shopping",
  metaDescription: "Shop the latest products at the best prices",
};

const useWebsiteInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfo = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch website info from real API
      const info = await contentService.getWebsiteInfo();

      setData(info);
      setError(null);
    } catch (err: any) {
      // Gracefully handle errors - use fallback data instead of crashing
      console.warn("Website info API not available, using fallback data:", err.message);

      // Set fallback data so UI doesn't crash
      setData(DEFAULT_WEBSITE_INFO);
      setError(null); // Don't set error to prevent UI from showing error state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return { data, loading, error, refetch: fetchInfo };
};

export default useWebsiteInfo;
