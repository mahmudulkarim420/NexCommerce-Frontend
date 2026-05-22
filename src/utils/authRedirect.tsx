"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthRedirect = ({ children }) => {
  const { data } = useSelector((state: any) => state.user); 
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  if (data) {
    return null;
  }
  return <>{children}</>;
};

export default AuthRedirect;
