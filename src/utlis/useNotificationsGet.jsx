"use client";
import { useCallback, useEffect, useState } from "react";
import { demoNotifications, simulateDelay } from "../data/demoData";

export const useNotificationsGet = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotification = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(500);

      // Use demo notifications
      setNotification(demoNotifications);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  return { notification, loading, error, refetch: fetchNotification };
};
