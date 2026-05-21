"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { demoProducts, simulateDelay } from "../data/demoData";

export const useSearchProduct = ({ search = "", page = 1, limit = 10 } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null); // Cancel previous request

  const fetchSearch = useCallback(async ({ search, page, limit }) => {
    if (!search || search.trim() === "") {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cancel previous request
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      await simulateDelay(400);

      // Search in demo products
      const searchLower = search.toLowerCase();
      const filteredProducts = demoProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setData({
        success: true,
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      });
    } catch (err) {
      if (err.name === "AbortError") return; // Ignore cancelled requests
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch when search changes
  useEffect(() => {
    if (!search || search.trim() === "") {
      setData(null);
      return;
    }

    const timeout = setTimeout(() => {
      fetchSearch({ search, page, limit });
    }, 400); // Debounce typing

    return () => clearTimeout(timeout);
  }, [search, page, limit, fetchSearch]);

  return {
    data,
    loading,
    error,
    // Allows manual refetch: refetch({ search, page, limit })
    refetch: (opts = {}) =>
      fetchSearch({
        search: opts.search ?? search,
        page: opts.page ?? page,
        limit: opts.limit ?? limit,
      }),
  };
};
