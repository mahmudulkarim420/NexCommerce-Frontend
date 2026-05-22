"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { getCartApi } from "@/src/hook/useCart";
import { getWishlistApi } from "@/src/hook/useWishlist";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
        <div className="flex items-center justify-between h-10 lg:h-12">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-2xl lg:text-3xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                NexCommerce
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </div>
          </Link>

          {/* CENTER: Navigation Links (Hidden on tablet and below) */}
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

          {/* RIGHT: Search, Sign In, Cart, Hamburger */}
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
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden text-white hover:text-amber-400 transition-colors"
            >
              {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
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

            {/* Hamburger Menu (Mobile/Tablet) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-amber-400 transition-colors p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden bg-gradient-to-r from-gray-900 to-black border-b border-gray-700/50 px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Slide Menu (Right Side) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black border-l border-gray-700/50 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <h2 className="text-white font-bold">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-6 py-4 border-b border-gray-700/30 font-medium transition-colors duration-300 ${
                pathname === link.href
                  ? "bg-amber-400/10 text-amber-400"
                  : "text-gray-300 hover:text-amber-400 hover:bg-gray-800/50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700/50 bg-gray-900/50 p-4 space-y-3">
          {!data?._id && (
            <Link
              href="/signin"
              className="block w-full py-2 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
          <Link
            href={data?._id ? "/account" : "/signin"}
            className="block w-full py-2 px-4 border border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400/10 transition-colors text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {data?._id ? "Account" : "Create Account"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
