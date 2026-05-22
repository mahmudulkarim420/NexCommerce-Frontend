"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryGet } from "../redux/categorySlice";
import { subcategoryGet } from "../redux/subcategorySlice";
import { categoryService } from "../services/category.service";

export const useCategoryWithSubcategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchCategoriesAndSubcategories = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch both categories and subcategories from real API
      const [categoriesData, subcategoriesData] = await Promise.all([
        categoryService.getAll(),
        categoryService.getAllSubcategories(),
      ]);

      // Map subcategories to their categories
      const categoriesWithSubs = categoriesData.map((category) => ({
        ...category,
        id: category._id || category.id,
        subcategories: subcategoriesData.filter(
          (sub) => sub.categoryId === category._id || sub.categoryId === category.id,
        ),
      }));

      setCategories(categoriesWithSubs);
      setSubcategories(subcategoriesData);
      dispatch(categoryGet(categoriesData));
      dispatch(subcategoryGet(subcategoriesData));
      setError(null);
    } catch (err: any) {
      console.error("Error fetching categories and subcategories:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, [fetchCategoriesAndSubcategories]);

  const getSubcategoriesForCategory = useCallback(
    (categoryId: string) => {
      return subcategories.filter(
        (sub: any) => sub.categoryId === categoryId || sub.categoryId?._id === categoryId,
      );
    },
    [subcategories],
  );

  return {
    categories,
    subcategories,
    loading,
    error,
    refetch: fetchCategoriesAndSubcategories,
    getSubcategoriesForCategory,
  };
};
