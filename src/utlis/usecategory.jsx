"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryGet } from "../redux/categorySlice";
import { demoCategories, simulateDelay } from "../data/demoData";

export const useCategory = () => {
  return useGetcategory();
};

export const useGetcategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(500);

      // Use demo categories
      setCategory(demoCategories);
      dispatch(categoryGet(demoCategories));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return { category, loading, error, refetch: fetchCategory };
};
