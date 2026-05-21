"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryGet } from "../redux/categorySlice";
import { subcategoryGet } from "../redux/subcategorySlice";
import { demoCategories, demoSubcategories, simulateDelay } from "../data/demoData";

export const useCategoryWithSubcategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchCategoriesAndSubcategories = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(600);

      // Map subcategories to their categories
      const categoriesWithSubs = demoCategories.map((category) => ({
        ...category,
        subcategories: demoSubcategories.filter((sub) => sub.categoryId === category._id),
      }));

      setCategories(categoriesWithSubs);
      dispatch(categoryGet(demoCategories));
      dispatch(subcategoryGet(demoSubcategories));
      setError(null);
    } catch (err) {
      console.error("Error fetching categories and subcategories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, [fetchCategoriesAndSubcategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategoriesAndSubcategories,
  };
};
