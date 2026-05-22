"use client";

import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Tag,
  TrendingUp,
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import LoadingPage from "@/src/helper/loading/loadingPge";
import BlogModal from "./BlogModal";
import { useGetBlogs } from "@/src/utils/content/useBlogs";
import { useGetcategory } from "@/src/utils/usecategory";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const { blogs, loading } = useGetBlogs();
  const { category, loading: categoryLoading } = useGetcategory();

  if (loading || categoryLoading) return <LoadingPage />;

  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400 text-sm">Insights & Stories</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="block text-white">DISCOVER</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                OUR BLOG
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Latest trends, expert tips, and inspiring stories from the world of e-commerce
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-40 bg-black/90 backdrop-blur-lg border-y border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                All
              </button>
              {category?.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/30"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
            <span>Showing {filteredPosts.length} articles</span>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl md:text-3xl font-black text-white">Featured Article</h2>
              </div>

              <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/30 transition-all duration-500">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img
                      src={featuredPost?.image}
                      alt={featuredPost?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-sm font-bold rounded-full">
                        <Sparkles className="w-4 h-4" />
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-white/10 text-amber-400 text-sm font-semibold rounded-full">
                        {featuredPost?.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost?.createdDateBn}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {featuredPost?.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {featuredPost?.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost?.readTime}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{featuredPost?.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{featuredPost?.comments}</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPost(featuredPost);
                        setShowModal(true);
                      }}
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 w-fit"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Articles
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto" />
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post?.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Read Time */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{post?.readTime}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post?.createdDateBn}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors cursor-pointer">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowModal(true);
                      }}
                      className="mt-4 w-full py-2.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 hover:text-black hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400 text-sm">Stay Updated</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Never Miss{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                an Update
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Subscribe to our newsletter and get the latest articles, exclusive content, and
              special offers delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Modal */}
      {showModal && <BlogModal blog={selectedPost} setShowModal={setShowModal} />}
    </div>
  );
};

export default BlogPage;
