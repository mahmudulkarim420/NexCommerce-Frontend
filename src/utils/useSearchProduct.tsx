"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { productService } from "../services/product.service";

export const useSearchProduct = ({ search = "", page = 1, limit = 10 } = {}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchSearch = useCallback(async ({ search, page, limit }: any) => {
    if (!search || search.trim() === "") {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      const response = await productService.getAll({ search, page, limit });

      setData({
        success: true,
        data: response.products,
        total: response.total,
        page,
        limit,
        totalPages: Math.ceil(response.total / limit),
      });
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!search || search.trim() === "") {
      setData(null);
      return;
    }

    const timeout = setTimeout(() => {
      fetchSearch({ search, page, limit });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, page, limit, fetchSearch]);

  return {
    data,
    loading,
    error,
    refetch: (opts: any = {}) =>
      fetchSearch({
        search: opts.search ?? search,
        page: opts.page ?? page,
        limit: opts.limit ?? limit,
      }),
  };
};
