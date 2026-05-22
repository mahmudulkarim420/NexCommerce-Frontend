"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/layout/header/Header";
import Footer from "@/src/components/Home/Footer";
import { useGetUser } from "@/src/utils/useGetUser";
import { useDispatch } from "react-redux";
import { userget, clearUser } from "@/src/redux/userSlice";
import { useEffect } from "react";
import BlockedUserRoute from "@/src/utils/BlockedUserRoute";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/dashboard");
  const { user } = useGetUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(userget(user));
    } else {
      dispatch(clearUser());
    }
  }, [user, dispatch]);

  return (
    <BlockedUserRoute>
      {!hideLayout && <Header />}
      <main className="relative">{children}</main>
      {!hideLayout && <Footer />}
    </BlockedUserRoute>
  );
}
