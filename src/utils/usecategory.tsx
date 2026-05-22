"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryGet } from "../redux/categorySlice";
import { categoryService } from "../services/category.service";

export const useCategory = () => {
  return useGetcategory();
};

export const useGetcategory = () => {
  const [category, setCategory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const categories = await categoryService.getAll();
      setCategory(categories);
      dispatch(categoryGet(categories));
      setError(null);
    } catch (err: any) {
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
