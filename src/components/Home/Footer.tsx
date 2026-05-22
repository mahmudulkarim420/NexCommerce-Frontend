"use client";

import useWebsiteInfo from "@/src/utils/useWebsiteInfo";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { IoLocationOutline, IoLogoFacebook } from "react-icons/io5";
import { MdAddCall, MdEmail } from "react-icons/md";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "fa-facebook": IoLogoFacebook,
  "fa-instagram": FaInstagram,
  "fa-twitter": FaTwitter,
  "fa-youtube": FaYoutube,
  "fa-linkedin": FaLinkedin,
};

function Footer() {
  const { data: siteInfo } = useWebsiteInfo();
  const socialLinks = siteInfo?.socialLinks || [];

  return (
    <footer className="relative bg-black">
      {/* Subtle Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Main Footer Content - Compact 3-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-white">
                Nex<span className="text-amber-400">Commerce</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for quality products. Innovation meets elegance.
            </p>
            
            {/* Compact Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <IoLocationOutline className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">{siteInfo?.address || "Dhaka, Bangladesh"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MdAddCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{siteInfo?.phone || "+8801700000000"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MdEmail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">{siteInfo?.email || "contact@nexcommerce.com"}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Shop", href: "/shop" },
                { label: "Categories", href: "/shop" },
                { label: "Contact", href: "/contact" },
                { label: "FAQs", href: "/faq" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks
                  .filter((link) => link.active)
                  .map((link, index) => {
                    const IconComponent = iconMap[link.icon];
                    if (!IconComponent) return null;

                    return (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-200"
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Business Hours
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Mon - Fri</span>
                  <span className="text-amber-400">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Saturday</span>
                  <span className="text-amber-400">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Compact */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} NexCommerce. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
                Terms
              </Link>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ y: -2 }}
                className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
