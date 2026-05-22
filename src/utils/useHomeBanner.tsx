"use client";
import { useCallback, useEffect, useState } from "react";
const demoHomeBanners = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));


export const useHomeBanner = () => {
  const [homebanner, setHomebanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHomebanner = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(500);

      // Use demo home banners
      setHomebanner(demoHomeBanners);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomebanner();
  }, [fetchHomebanner]);

  return { homebanner, loading, error, refetch: fetchHomebanner };
};
