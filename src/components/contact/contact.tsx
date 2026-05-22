"use client";

import { motion } from "motion/react";
import socket from "@/src/config/socket";
import { ContactCreate } from "@/src/hook/content/useContact";
import { CreateNotification } from "@/src/hook/useNotification";
import useWebsiteInfo from "@/src/utils/useWebsiteInfo";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Sparkles,
  Globe,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: siteInfo } = useWebsiteInfo();

  // Socket notifications
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("notification:new", (notif) => {
      toast.success(`${notif.title}: ${notif.message}`);
    });

    return () => {
      socket.off("connect");
      socket.off("notification:new");
    };
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formData;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }

    if (!message.trim() || message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await ContactCreate(formData);
      setIsSubmitted(true);

      await CreateNotification({
        title: "New Contact Message",
        message: `${name} - ${subject}`,
        type: "email",
        referenceId: response.data._id,
        meta: { message: response.data.message },
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: siteInfo?.number || "+880 1234-567890",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      value: siteInfo?.email || "contact@nexcommerce.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Location",
      value: siteInfo?.address || "Dhaka, Bangladesh",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: siteInfo?.deliveryText || "24/7 Available",
      gradient: "from-amber-500 to-yellow-500",
    },
  ];

  const features = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving customers worldwide",
    },
    {
      icon: MessageSquare,
      title: "Quick Response",
      description: "We reply within 24 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-gray-400 text-sm">Get In Touch</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="block text-white">LET'S START A</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600">
                CONVERSATION
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${info.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <info.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                <p className="text-gray-400 text-sm">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Why{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                    Contact Us?
                  </span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We're here to help you with any questions, concerns, or feedback. Our dedicated
                  team is committed to providing you with the best support experience.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-400/20 rounded-2xl">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Quick Response Guarantee
                </h3>
                <p className="text-gray-400 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. For
                  urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 hover:bg-white/[0.07] transition-all duration-300">
                <h2 className="text-3xl font-black text-white mb-6">
                  Send Us a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                    Message
                  </span>
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <p className="text-green-300 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
                        placeholder="+880 1234-567890"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <MessageSquare className="inline w-4 h-4 mr-2" />
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-2" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Get{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Started?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Our team is available 24/7 to assist you with any questions or concerns. Don't
              hesitate to reach out!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
