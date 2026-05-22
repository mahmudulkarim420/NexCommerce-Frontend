"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  X,
  User,
  Tag,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";

interface BlogModalProps {
  blog: any;
  setShowModal: (show: boolean) => void;
}

const BlogModal = ({ blog, setShowModal }: BlogModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = blog.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={() => setShowModal(false)}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] bg-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header with Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90 border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Back Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2 px-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Category Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-sm font-bold rounded-full">
                <Tag className="w-4 h-4" />
                {blog.category}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.createdDateBn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views || "1.2k"} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-lg border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  <span className="text-sm font-semibold">{blog.likes}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-full transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">{blog.comments}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isBookmarked
                      ? "bg-amber-500 text-black"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-full transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 bg-black border border-white/10 rounded-2xl p-2 shadow-xl min-w-[200px]"
                    >
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <Facebook className="w-5 h-5" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <Twitter className="w-5 h-5" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span>Copy Link</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-400px)] px-6 md:px-12 py-8">
            {/* Status Badge */}
            {blog.status && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold rounded-full mb-6">
                {blog.status}
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-8 p-6 bg-white/5 border-l-4 border-amber-400 rounded-r-2xl">
                <p className="text-lg text-gray-300 italic leading-relaxed">{blog.excerpt}</p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
                {blog.content?.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-400" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 text-sm rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Info */}
            <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Written by {blog.author}</h4>
                  <p className="text-gray-400 text-sm">Content Creator & E-commerce Expert</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;
