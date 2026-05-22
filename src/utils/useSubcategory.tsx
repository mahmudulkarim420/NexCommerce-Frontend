"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { subcategoryGet } from "../redux/subcategorySlice";
import { categoryService } from "../services/category.service";

export const useSubcategory = () => {
  return useGetSubcategory();
};

export const useGetSubcategory = () => {
  const [subcategory, setSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchSubcategory = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch subcategories from real API
      const subcategories = await categoryService.getAllSubcategories();

      setSubcategory(subcategories);
      dispatch(subcategoryGet(subcategories));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch subcategories");
      console.error("Error fetching subcategories:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSubcategory();
  }, [fetchSubcategory]);

  return { subcategory, loading, error, refetch: fetchSubcategory };
};
