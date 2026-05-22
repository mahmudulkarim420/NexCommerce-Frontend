"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBar({
  className = "",
  placeholder = "Search for products, categories or brands",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // Debounce input to avoid excessive work
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Auto-search as user types (using debounced value)
  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/shop?search=${encodeURIComponent(debouncedSearch)}`);
    }
    // Removed router.push("/") when search is cleared to prevent destructive navigation
  }, [debouncedSearch, router]);

  const handleFocus = () => {
    router.push(`/shop?search=${encodeURIComponent(searchQuery || "")}`);
  };

  return (
    <div className={`flex-1 relative flex items-center ${className}`}>
      <Search className="absolute left-4 lg:left-6 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={handleFocus}
        className="w-full pl-12 lg:pl-14 pr-4 lg:pr-6 py-3 lg:py-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 font-medium"
      />
    </div>
  );
}
