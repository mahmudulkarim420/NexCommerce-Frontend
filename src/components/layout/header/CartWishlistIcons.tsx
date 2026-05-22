"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function CartWishlistIcons() {
  const { data: wishlistItems } = useSelector((state: any) => state.wishlist);
  const { items: cartItems } = useSelector((state: any) => state.cart);
  const data = useSelector((state: any) => state.user.data);

  const wishlistCount = wishlistItems?.length || 0;
  const cartCount = (cartItems || []).reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0,
  );

  return (
    <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
      {/* User Account */}
      {data ? (
        <Link
          href="/account"
          className="flex items-center text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300 shadow-sm">
            <User size={18} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <div className="hidden lg:block text-xs text-gray-500 font-medium">Account</div>
          </div>
        </Link>
      ) : (
        <Link
          href="/signin"
          className="flex items-center text-gray-700 hover:text-emerald-600 transition-all duration-300 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300 shadow-sm">
            <User size={18} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <div className="hidden lg:block text-xs text-gray-500 font-medium">SignIn</div>
          </div>
        </Link>
      )}

      {/* Wishlist */}
      <div className="relative cursor-pointer group">
        <Link
          href="/wishlist"
          className="flex items-center space-x-1 sm:space-x-2 text-gray-700 group-hover:text-emerald-600 transition-all duration-300"
        >
          <div className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-pink-100 group-hover:to-rose-100 transition-all duration-300 shadow-sm">
            <Heart
              size={16}
              className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-pink-600"
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center font-bold animate-bounce shadow-lg">
                {wishlistCount}
              </span>
            )}
          </div>
          <div className="hidden sm:block lg:block">
            <div className="text-xs text-gray-500 font-medium">Wishlist</div>
          </div>
        </Link>
      </div>

      {/* Cart */}
      <div className="relative cursor-pointer group">
        <Link
          href="/addtocart"
          className="flex items-center space-x-1 sm:space-x-2 text-gray-700 group-hover:text-emerald-600 transition-all duration-300"
        >
          <div className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300 shadow-sm">
            <ShoppingCart
              size={16}
              className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs rounded-full h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                {cartCount}
              </span>
            )}
          </div>
          <div className="hidden sm:block lg:block">
            <div className="text-xs text-gray-500 font-medium">Cart</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
