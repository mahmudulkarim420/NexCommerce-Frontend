"use client";
import { useCallback, useEffect, useState } from "react";
import { demoWebsiteInfo, simulateDelay } from "../data/demoData";

const useWebsiteInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInfo = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(400);

      // Use demo website info
      setData(demoWebsiteInfo);
      setError(null);
    } catch (err) {
      setError(err.message);
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
