"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { subcategoryGet } from "../redux/subcategorySlice";
import { demoSubcategories, simulateDelay } from "../data/demoData";

export const useSubcategory = () => {
  return useGetSubcategory();
};

export const useGetSubcategory = () => {
  const [subcategory, setSubcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        await simulateDelay(500);

        // Use demo subcategories
        setSubcategory(demoSubcategories);
        dispatch(subcategoryGet(demoSubcategories));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return { subcategory, loading, error };
};
