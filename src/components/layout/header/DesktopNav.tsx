"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

export default function DesktopNav() {
  const data = useSelector((state: any) => state.user.data);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog", badge: "New" },
    { name: "Contact", href: "/contact" },
  ];

  if (data?.role === "ADMIN") {
    navItems.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-t border-gray-200/60 backdrop-blur-sm">
      <div className="container mx-auto px-2 sm:px-4 hidden lg:block">
        <nav className="hidden lg:flex items-center justify-between py-3 lg:py-4">
          <div className="flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-300 group hover:scale-105"
              >
                <span className="text-sm lg:text-base">{item.name}</span>
                {item.badge && (
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 lg:px-3 py-0.5 lg:py-1 rounded-full font-bold shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
