"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productGet } from "../redux/productSlice";
import { productService } from "../services/product.service";

export const useProduct = () => {
  return useGetProduct();
};

export const useGetProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch products from real API
      const response = await productService.getAll();
      const products = response.products || response.data || [];

      setProduct(products);
      dispatch(productGet(products));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};
