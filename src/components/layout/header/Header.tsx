"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { getCartApi } from "@/src/hook/useCart";
import { getWishlistApi } from "@/src/hook/useWishlist";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.user.data);
  const cart = useSelector((state: any) => state.cart.cart);

  // Load wishlist + cart for logged-in user
  useEffect(() => {
    if (data?._id) {
      getWishlistApi(dispatch);
      getCartApi(data._id, dispatch);
    }
  }, [dispatch, data?._id]);

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cart?.products?.length || 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-2xl lg:text-3xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                NexCommerce
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          {/* CENTER: Navigation Links (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 group ${
                  pathname === link.href ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* RIGHT: Search, Sign In, Cart */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 px-4 py-2 pl-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button className="md:hidden text-white hover:text-amber-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Sign In Icon */}
            <Link
              href={data?._id ? "/account" : "/signin"}
              className="text-white hover:text-amber-400 transition-colors duration-300"
            >
              <User className="w-5 h-5 lg:w-6 lg:h-6" />
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              href="/addtocart"
              className="relative text-white hover:text-amber-400 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (Dropdown) */}
        <nav className="lg:hidden pb-4">
          <div className="flex items-center justify-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
