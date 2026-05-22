"use client";
import { useCallback, useEffect, useState } from "react";
const demoUsers = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));


export const useGetAllUser = () => {
  const [allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGetallUsers = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(600);

      // Use demo users
      setAllusers(demoUsers);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGetallUsers();
  }, [fetchGetallUsers]);

  return { allusers, loading, error, refetch: fetchGetallUsers };
};
