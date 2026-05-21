"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productGet } from "../redux/productSlice";
import { demoProducts, simulateDelay } from "../data/demoData";

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
      await simulateDelay(600);

      // Use demo products
      setProduct(demoProducts);
      dispatch(productGet(demoProducts));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};
