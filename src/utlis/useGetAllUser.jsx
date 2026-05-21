"use client";
import { useCallback, useEffect, useState } from "react";
import { demoUsers, simulateDelay } from "../data/demoData";

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
