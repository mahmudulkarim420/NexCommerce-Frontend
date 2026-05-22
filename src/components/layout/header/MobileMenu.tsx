"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useCategoryWithSubcategories } from "@/src/utils/useCategoryWithSubcategories";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<number | null>(null);
  const data = useSelector((state: any) => state.user.data);

  const { categories, loading: categoriesLoading } = useCategoryWithSubcategories();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog", badge: "New" },
    { name: "Contact", href: "/contact" },
  ];

  if (data?.role === "ADMIN") {
    navItems.push({ name: "Dashboard", href: "/dashboard" });
  }

  const menuCategories = (categories || []).map((cat: any) => ({
    ...cat,
    icon: cat.icon || cat.image || null,
    subcategories: cat.subcategories?.map((s: any) => s.name) || [],
  }));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-emerald-100 hover:to-teal-100 text-gray-700 hover:text-emerald-600 transition-all duration-300 shadow-sm"
      >
        {isOpen ? (
          <X size={20} className="sm:w-6 sm:h-6" />
        ) : (
          <Menu size={20} className="sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 animate-in slide-in-from-top-5 duration-300">
          <nav className="px-2 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2 max-h-96 overflow-visible">
            {navItems.map((item, index) => (
              <Link
                onClick={onToggle}
                key={index}
                href={item.href}
                className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 rounded-lg sm:rounded-xl transition-all duration-300 font-medium shadow-sm"
              >
                <span className="text-sm sm:text-base">{item.name}</span>
                {item.badge && (
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Categories Section */}
            <div className="border-t max-h-[25vh] overflow-y-scroll border-gray-200/60 pt-3 sm:pt-4 mt-3 sm:mt-4 sm:hidden">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-gray-700 rounded-xl transition-all duration-300 font-medium shadow-sm hover:bg-emerald-50"
              >
                <span className="text-sm font-semibold">Categories</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="mt-2 space-y-2 bg-gradient-to-r from-gray-50 to-white rounded-xl p-2 animate-in slide-in-from-top-3 duration-300">
                  {menuCategories.map((category: any, index: number) => {
                    const isOpen = openMobileCategory === index;

                    return (
                      <div
                        key={category.id}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                      >
                        {/* Category */}
                        <button
                          onClick={() => setOpenMobileCategory(isOpen ? null : index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gray-700 font-medium"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </div>

                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Subcategories */}
                        {isOpen && (
                          <div className="px-4 pb-3 space-y-1 animate-in slide-in-from-top-2">
                            {category.subcategories.map((sub: string) => (
                              <Link
                                key={sub}
                                onClick={onToggle}
                                href={`/shop?category=${encodeURIComponent(sub)}`}
                                className="block py-2 px-2 rounded-md text-sm text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
