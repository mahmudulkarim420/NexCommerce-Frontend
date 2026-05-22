"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userget } from "../redux/userSlice";
const getCurrentUser = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));


export const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        await simulateDelay(500);

        // Use demo current user
        const currentUser = getCurrentUser();
        setUser(currentUser);
        dispatch(userget({ success: true, data: currentUser }));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { user, loading, error };
};
