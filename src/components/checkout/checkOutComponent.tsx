"use client";

import {
  createManualPaymentOrder,
  createSslPaymentOrder,
  initPaymentSession,
  submitManualPayment,
} from "@/src/hook/useOrder";
import { cartClear } from "@/src/redux/cartSlice";
import { MapPin, Shield, ShoppingBag, ShoppingCart, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LocationSelects from "../LocationSelects";

export default function CheckoutComponent() {
  const user = useSelector((state: any) => state.user?.data);
  const dispatch = useDispatch();
  const { items } = useSelector((state: any) => state.cart || {});
  const cartItems = items || [];

  const [selectedPayment, setSelectedPayment] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    division: "",
    district: "",
    area: "",
    pincode: "",
  });

  const [selectedManualMethod, setSelectedManualMethod] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [manualOrderStep, setManualOrderStep] = useState("initial");
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(60);
  const [manualPaymentInfo, setManualPaymentInfo] = useState({
    senderNumber: "",
    transactionId: "",
  });

  const isValidBDPhone = (phone) => /^01[3-9]\d{8}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // simple email regex
  const detectDhaka = (address, city, area) => {
    const addr = [address, city, area].filter(Boolean).join(" ").toLowerCase();
    return addr.includes("dhaka") || addr.includes("à¦¢à¦¾à¦•à¦¾");
  };

  // subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );
  const total = subtotal + deliveryCharge;
  console.log("cartItems", cartItems);

  useEffect(() => {
    // if user already has an address prefills
    if (user?.address) {
      setCustomerInfo((p) => ({ ...p, address: user.address }));
    }
  }, [user]);

  useEffect(() => {
    // Only allow 60 or 120
    const dhakaDistricts = [
      "Dhaka",
      "à¦¢à¦¾à¦•à¦¾",
      "Dhanmondi",
      "Gulshan",
      "Mirpur",
      "Motijheel",
      "Uttara",
      "Mohammadpur",
      "Tejgaon",
      "Kamrangirchar",
    ];

    if (dhakaDistricts.includes(customerInfo.district)) {
      setDeliveryCharge(60);
    } else if (customerInfo.district) {
      setDeliveryCharge(120);
    }
  }, [customerInfo.district]);

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const distObj = districts.find((d) => d.district === district);
    setUpazilaList(distObj?.upazilas || []);
    setCustomerInfo((prev) => ({ ...prev, district, area: "", division: selectedDivision }));
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Create order helper
  const createOrder = async (override = {}) => {
    const delivery_address = {
      address_line: customerInfo.address,
      district: customerInfo.district,
      division: customerInfo.division,
      upazila_thana: customerInfo.area,
      pincode: customerInfo.pincode, // Use collected pincode
      country: "Bangladesh", // Assuming default
      mobile: customerInfo.phone ? Number(customerInfo.phone) : null,
    };

    // Determine payment_type based on selectedPayment or override
    let paymentType = "full";
    if (selectedPayment === "ssl-delivery" || override.payDeliveryOnly) {
      paymentType = "delivery";
    }

    const payload = {
      userId: user._id,
      products: cartItems.map((item) => {
        const product = item.productId || {};
        const price = item.price ?? product.price ?? 0;
        return {
          productId: product._id || item.productId,
          name: product.productName || item.name,
          image: product.images || item.image,
          quantity: item.quantity,
          price: price,
          totalPrice: (Number(price) || 0) * (Number(item.quantity) || 0),
          size: item.size || null,
          color: item.color || null,
          weight: item.weight || null,
        };
      }),

      delivery_address,
      deliveryCharge,
      subTotalAmt: subtotal,
      totalAmt: subtotal + deliveryCharge, // Total amount is always full order value

      payment_method:
        override.payment_method || (selectedPayment === "manual" ? "manual" : "sslcommerz"),
      payment_type: paymentType, // Set payment_type here
      payment_details:
        override.payment_method === "manual" || selectedPayment === "manual"
          ? null
          : override.payment_details || {},
    };

    if (payload.payment_method === "manual") {
      return createManualPaymentOrder(payload);
    } else if (payload.payment_method === "sslcommerz") {
      return createSslPaymentOrder(payload);
    } else {
      // Fallback or error, though the logic above should prevent this
      console.error("Unknown payment method:", payload.payment_method);
      throw new Error("Invalid payment method selected for order creation.");
    }
  };

  // One-click SSL (full or delivery-only)
  const handleProceedToPayment = async ({ payDeliveryOnly = false } = {}) => {
    const { name, phone, email, address, division, district, area, pincode } = customerInfo;

    // 1ï¸âƒ£ Required fields
    if (!name || !phone || !address || !division || !district || !area || !pincode) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦¸à¦•à¦² à¦ªà§à¦°à¦¯à¦¼à§‹à¦œà¦¨à§€à¦¯à¦¼ à¦¤à¦¥à§à¦¯ à¦ªà§‚à¦°à¦£ à¦•à¦°à§à¦¨ (à¦ à¦¿à¦•à¦¾à¦¨à¦¾ à¦¸à¦¹)");
      return;
    }

    // 2ï¸âƒ£ Phone validation
    if (!isValidBDPhone(phone)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à¦¿ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¦à¦¿à¦¨ (01XXXXXXXXX)");
      return;
    }

    // 3ï¸âƒ£ Email validation (optional)
    if (email && !isValidEmail(email)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦‡à¦®à§‡à¦‡à¦² à¦ à¦¿à¦•à¦¾à¦¨à¦¾ à¦¦à¦¿à¦¨");
      return;
    }

    if (!selectedPayment) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦à¦•à¦Ÿà¦¿ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦®à§‡à¦¥à¦¡ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨");
      return;
    }

    if (!user?._id) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦ªà§à¦°à¦¥à¦®à§‡ à¦²à¦—à¦‡à¦¨ à¦•à¦°à§à¦¨");
      return;
    }

    if (!cartItems.length) {
      toast.error("à¦•à¦¾à¦°à§à¦Ÿ à¦–à¦¾à¦²à¦¿ à¦†à¦›à§‡");
      return;
    }

    try {
      setIsProcessing(true);

      const paymentType = payDeliveryOnly ? "delivery" : "full";

      // Create order (manual / pending for now, will be updated by SSL)
      const orderRes = await createOrder({
        payment_method: "sslcommerz",
        payment_type: paymentType,
      });

      const dbOrder = orderRes?.data;
      const dbOrderId = dbOrder?._id;

      if (!dbOrderId) {
        throw new Error("Order à¦¤à§ˆà¦°à¦¿ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡ (ID à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿)");
      }

      //  Init SSL payment
      const paymentRes = await initPaymentSession({
        orderId: dbOrderId,
        payment_type: paymentType,
        userId: user._id,
        success_url: `${window.location.origin}/payment/success`,
      });

      const gatewayUrl = paymentRes?.url;

      if (!gatewayUrl) {
        throw new Error("Payment à¦—à§‡à¦Ÿà¦“à¦¯à¦¼à§‡ URL à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿");
      }

      toast.success("à¦†à¦ªà¦¨à¦¾à¦•à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà§‡à¦‡à¦œà§‡ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à¦šà§à¦›à§‡...");
      window.location.href = gatewayUrl;
    } catch (error) {
      console.error("SSLCommerz init error:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¶à§à¦°à§ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡, à¦ªà¦°à§‡ à¦†à¦¬à¦¾à¦° à¦šà§‡à¦·à§à¦Ÿà¦¾ à¦•à¦°à§à¦¨à¥¤";
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualPaymentInfoChange = (field, value) => {
    setManualPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleManualOrderAndPaymentSubmission = async ({ payDeliveryOnly = false }) => {
    const { name, phone, email, address, division, district, area, pincode } = customerInfo;
    const { senderNumber, transactionId } = manualPaymentInfo;

    // 1ï¸âƒ£ Required fields for customer info
    if (!name || !phone || !address || !division || !district || !area || !pincode) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦¸à¦•à¦² à¦ªà§à¦°à¦¯à¦¼à§‹à¦œà¦¨à§€à¦¯à¦¼ à¦¤à¦¥à§à¦¯ à¦ªà§‚à¦°à¦£ à¦•à¦°à§à¦¨ (à¦ à¦¿à¦•à¦¾à¦¨à¦¾ à¦¸à¦¹)");
      return;
    }

    // 2ï¸âƒ£ Phone validation for customer
    if (!isValidBDPhone(phone)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à¦¿ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¦à¦¿à¦¨ (01XXXXXXXXX)");
      return;
    }

    // 3ï¸âƒ£ Email validation (optional)
    if (email && !isValidEmail(email)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦‡à¦®à§‡à¦‡à¦² à¦ à¦¿à¦•à¦¾à¦¨à¦¾ à¦¦à¦¿à¦¨");
      return;
    }

    // 4ï¸âƒ£ Required fields for manual payment
    if (!selectedManualMethod) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦à¦•à¦Ÿà¦¿ à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà¦¦à§à¦§à¦¤à¦¿ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨");
      return;
    }
    if (!senderNumber || !transactionId) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦° à¦à¦¬à¦‚ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦‰à¦­à¦¯à¦¼à¦‡ à¦¦à¦¿à¦¨");
      return;
    }
    if (transactionId.length < 6) {
      toast.error("à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦•à¦®à¦ªà¦•à§à¦·à§‡ à§¬ à¦…à¦•à§à¦·à¦°à§‡à¦° à¦¹à¦¤à§‡ à¦¹à¦¬à§‡");
      return;
    }
    if (!isValidBDPhone(senderNumber)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à¦¿ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¦à¦¿à¦¨ (01XXXXXXXXX) à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦°à§‡à¦° à¦œà¦¨à§à¦¯");
      return;
    }

    if (!user?._id) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦ªà§à¦°à¦¥à¦®à§‡ à¦²à¦—à¦‡à¦¨ à¦•à¦°à§à¦¨");
      return;
    }

    if (!cartItems.length) {
      toast.error("à¦•à¦¾à¦°à§à¦Ÿ à¦–à¦¾à¦²à¦¿ à¦†à¦›à§‡");
      return;
    }

    try {
      setIsProcessing(true);

      // 1. Create order
      const orderRes = await createOrder({
        payment_method: "manual",
        payDeliveryOnly: payDeliveryOnly,
        // Passing manual payment details here to be stored with the order if backend supports
        payment_details: {
          provider: selectedManualMethod,
          senderNumber: senderNumber,
          transactionId: transactionId,
        },
      });

      const order = orderRes?.data;
      const dbOrderId = order?._id;

      if (!dbOrderId) {
        throw new Error("Order à¦¤à§ˆà¦°à¦¿ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡ (ID à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿)");
      }

      // 2. Submit manual payment details
      const paymentSubmissionRes = await submitManualPayment({
        orderId: dbOrderId,
        provider: selectedManualMethod,
        senderNumber: senderNumber,
        transactionId: transactionId,
        paidFor: payDeliveryOnly ? "delivery" : "full",
      });

      toast.success("à¦…à¦°à§à¦¡à¦¾à¦° à¦à¦¬à¦‚ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦œà¦®à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡!");

      // Clear cart and update step
      dispatch(cartClear());
      // Update createdOrder with potentially more accurate information from payment submission
      // Specifically, override payment_type based on what was *actually paid for*
      setCreatedOrder({
        ...order,
        payment_type:
          paymentSubmissionRes.order?.payment_details?.manual?.paidFor || order.payment_type,
        payment_status: paymentSubmissionRes.order?.payment_status || order.payment_status,
      });
      setManualOrderStep("payment_submitted");
    } catch (err) {
      console.error("Manual order and payment submission error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦…à¦°à§à¦¡à¦¾à¦° à¦“ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦œà¦®à¦¾ à¦¦à¦¿à¦¤à§‡ à¦¬à§à¦¯à¦°à§à¦¥ à¦¹à¦¯à¦¼à§‡à¦›à§‡";
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const manualMethods = [
    {
      id: "bkash",
      name: "Bkash Personal",
      number: "01626420774",
    },
    {
      id: "nagad",
      name: "Nagad Personal",
      number: "01626420774",
    },
    {
      id: "rocket",
      name: "Rocket Personal",
      number: "01626420774",
    },
    {
      id: "upay",
      name: "Upay Personal",
      number: "01626420774",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600bg-clip-text text-transparent">
                  NexCommerce
                </h1>
                <p className="text-gray-600 text-sm">à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦“ à¦¦à§à¦°à§à¦¤ à¦…à¦¨à¦²à¦¾à¦‡à¦¨ à¦¶à¦ªà¦¿à¦‚</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">à¦—à§à¦°à¦¾à¦¹à¦•à§‡à¦° à¦¤à¦¥à§à¦¯</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      à¦ªà§‚à¦°à§à¦£ à¦¨à¦¾à¦® *
                    </label>
                    <input
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦® à¦²à¦¿à¦–à§à¦¨"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° *
                    </label>
                    <input
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      à¦‡à¦®à§‡à¦‡à¦² à¦ à¦¿à¦•à¦¾à¦¨à¦¾
                    </label>
                    <input
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦ à¦¿à¦•à¦¾à¦¨à¦¾</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦ à¦¿à¦•à¦¾à¦¨à¦¾ *
                    </label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="à¦¬à¦¾à¦¡à¦¼à¦¿/à¦«à§à¦²à§à¦¯à¦¾à¦Ÿ à¦¨à¦®à§à¦¬à¦°, à¦°à§‹à¦¡ à¦¨à¦®à§à¦¬à¦°, à¦à¦²à¦¾à¦•à¦¾à¦° à¦¨à¦¾à¦®"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      à¦ªà§‹à¦¸à§à¦Ÿ à¦•à§‹à¦¡ *
                    </label>
                    <input
                      value={customerInfo.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="à¦ªà§‹à¦¸à§à¦Ÿ à¦•à§‹à¦¡ à¦¦à¦¿à¦¨"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <LocationSelects customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">à¦…à¦°à§à¦¡à¦¾à¦° à¦¸à¦¾à¦®à¦¾à¦°à¦¿</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.length === 0 && (
                    <div className="text-center py-6 text-gray-500">à¦•à¦¾à¦°à§à¦Ÿ à¦–à¦¾à¦²à¦¿à¥¤</div>
                  )}

                  {cartItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="relative">
                        <img
                          src={item.productId.images?.[0] || item.image || "/placeholder.svg"}
                          alt={item.productId?.productName || item.name || "Product"}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.productId?.productName || item.name || "Unnamed Product"}
                        </h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-600">{item.ratings || "5"}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          à§³
                          {(
                            item.totalPrice || (item.price || 0) * (item.quantity || 1)
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          à§³{(item.price || 0).toLocaleString()} Ã— {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between text-gray-700">
                    <span>à¦¸à¦¾à¦¬à¦Ÿà§‹à¦Ÿà¦¾à¦²</span>
                    <span className="font-medium">à§³{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦šà¦¾à¦°à§à¦œ</span>
                    </span>
                    <span className="font-medium">à§³{deliveryCharge}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>à¦®à§‹à¦Ÿ</span>
                      <span className="text-blue-600">
                        à§³{(subtotal + deliveryCharge).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦®à§‡à¦¥à¦¡</h4>

                  <div className="space-y-3">
                    {/* ================= Manual Payment ================= */}
                    <div
                      className={`manual-payment-section p-3 rounded-xl border cursor-pointer
        ${selectedPayment === "manual" ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}
      `}
                      onClick={() => setSelectedPayment("manual")}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === "manual"}
                          readOnly
                        />

                        <div className="flex-1 flex justify-between">
                          <div>
                            <div className="font-medium">
                              à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ (Bkash / Nagad / Rocket)
                            </div>
                            <div className="text-xs text-gray-500">
                              à¦†à¦ªà¦¨à¦¿ à¦ªà§à¦°à¦¦à¦¤à§à¦¤ à¦¨à¦®à§à¦¬à¦°à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦•à¦°à§‡ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦œà¦®à¦¾ à¦¦à§‡à¦¬à§‡à¦¨
                            </div>
                          </div>

                          <div className="text-sm font-semibold text-gray-700">
                            à§³{(subtotal + deliveryCharge).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Manual Section */}
                      {selectedPayment === "manual" && manualOrderStep === "initial" && (
                        <div
                          className="mt-4 space-y-3"
                          onClick={(e) => e.stopPropagation()} // ðŸ”¥ key fix
                        >
                          {/* Manual Methods */}
                          {manualMethods.map((method) => {
                            const isActive = selectedManualMethod === method.id;

                            return (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setSelectedManualMethod(method.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition
                  ${
                    isActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-400"
                  }
                `}
                              >
                                <div className="text-left">
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-xs text-gray-500">{method.number}</div>
                                </div>

                                <span
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isActive ? "border-green-600" : "border-gray-300"}
                  `}
                                >
                                  {isActive && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                                  )}
                                </span>
                              </button>
                            );
                          })}

                          {/* Input fields for manual payment details */}
                          <div className="pt-2 space-y-3">
                            <input
                              type="text"
                              placeholder="à¦†à¦ªà¦¨à¦¾à¦° à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° (à¦¯à§‡à¦‡ à¦¨à¦®à§à¦¬à¦° à¦¥à§‡à¦•à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦•à¦°à§‡à¦›à§‡à¦¨)"
                              value={manualPaymentInfo.senderNumber}
                              onChange={(e) =>
                                handleManualPaymentInfoChange("senderNumber", e.target.value)
                              }
                              className="w-full px-3 py-2 border rounded-xl"
                              disabled={isProcessing}
                            />

                            <input
                              type="text"
                              placeholder="à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ (Transaction ID)"
                              value={manualPaymentInfo.transactionId}
                              onChange={(e) =>
                                handleManualPaymentInfoChange("transactionId", e.target.value)
                              }
                              className="w-full px-3 py-2 border rounded-xl"
                              disabled={isProcessing}
                            />
                          </div>

                          {/* New Payment Buttons */}
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() =>
                                handleManualOrderAndPaymentSubmission({ payDeliveryOnly: true })
                              }
                              disabled={isProcessing || !selectedManualMethod}
                              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                            >
                              {isProcessing
                                ? "à¦ªà§à¦°à¦¸à§‡à¦¸à¦¿à¦‚ à¦¹à¦šà§à¦›à§‡..."
                                : `à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦šà¦¾à¦°à§à¦œ à¦¦à¦¿à¦¨ à§³${deliveryCharge}`}
                            </button>
                            <button
                              onClick={() =>
                                handleManualOrderAndPaymentSubmission({ payDeliveryOnly: false })
                              }
                              disabled={isProcessing || !selectedManualMethod}
                              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                            >
                              {isProcessing
                                ? "à¦ªà§à¦°à¦¸à§‡à¦¸à¦¿à¦‚ à¦¹à¦šà§à¦›à§‡..."
                                : `à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¦à¦¿à¦¨ à§³${(subtotal + deliveryCharge).toLocaleString()}`}
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedPayment === "manual" &&
                        manualOrderStep === "order_created" &&
                        createdOrder && (
                          <div className="mt-4 space-y-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <h3 className="font-bold text-blue-800 text-lg">
                              à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦¿à¦°à§à¦¦à§‡à¦¶à¦¾à¦¬à¦²à§€
                            </h3>
                            <p className="text-sm text-blue-700">
                              à¦†à¦ªà¦¨à¦¾à¦° à¦…à¦°à§à¦¡à¦¾à¦° <strong>#{createdOrder._id?.substring(0, 8)}</strong>{" "}
                              à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦¤à§ˆà¦°à¦¿ à¦¹à¦¯à¦¼à§‡à¦›à§‡à¥¤ à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦¨à¦¿à¦šà§‡à¦° à¦§à¦¾à¦ªà¦—à§à¦²à§‹ à¦…à¦¨à§à¦¸à¦°à¦£ à¦•à¦°à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ
                              à¦¸à¦®à§à¦ªà¦¨à§à¦¨ à¦•à¦°à§à¦¨à¥¤
                            </p>
                            <p className="font-medium text-blue-700">
                              à¦®à§‹à¦Ÿ à¦ªà§à¦°à¦¦à§‡à¦¯à¦¼: à§³{createdOrder.totalAmt.toLocaleString()}
                            </p>

                            {/* Render payment instructions based on selectedManualMethod */}
                            {selectedManualMethod && (
                              <div className="bg-blue-100 p-3 rounded-lg text-sm">
                                <p>Send à§³{createdOrder.totalAmt.toLocaleString()} to:</p>
                                {
                                  manualMethods.find((m) => m.id === selectedManualMethod)?.name
                                }:{" "}
                                <strong>
                                  {manualMethods.find((m) => m.id === selectedManualMethod)?.number}
                                </strong>
                                <p className="mt-1 text-xs text-blue-600">
                                  <i>(à¦¦à¦¯à¦¼à¦¾ à¦•à¦°à§‡ à¦¬à§à¦¯à¦•à§à¦¤à¦¿à¦—à¦¤ à¦¨à¦®à§à¦¬à¦°à§‡ à¦¸à§‡à¦¨à§à¦¡ à¦®à¦¾à¦¨à¦¿ à¦•à¦°à§à¦¨)</i>
                                </p>
                              </div>
                            )}

                            <p className="text-sm text-blue-700 mt-2">
                              à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦•à¦°à¦¾à¦° à¦ªà¦°, à¦¨à¦¿à¦šà§‡à¦° à¦«à¦°à§à¦®à§‡ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦à¦¬à¦‚ à¦†à¦ªà¦¨à¦¾à¦° à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦°
                              à¦œà¦®à¦¾ à¦¦à¦¿à¦¨à¥¤
                            </p>
                            {/* ManualPaymentForm Component - This section is now likely redundant if payments are submitted upfront.
                            I am keeping it here for now, but its rendering conditions should prevent it from showing. */}
                            {/* <ManualPaymentForm
                          order={createdOrder}
                          selectedManualMethod={selectedManualMethod}
                          manualMethods={manualMethods}
                          setManualOrderStep={setManualOrderStep}
                        /> */}
                          </div>
                        )}

                      {selectedPayment === "manual" && manualOrderStep === "payment_submitted" && (
                        <div className="mt-4 space-y-3 p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                          <h3 className="font-bold text-green-800 text-lg">à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦œà¦®à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡!</h3>
                          <p className="text-sm text-green-700">
                            à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿà§‡à¦° à¦¤à¦¥à§à¦¯ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦œà¦®à¦¾ à¦¦à§‡à¦“à¦¯à¦¼à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡à¥¤ à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨à§‡à¦° à¦•à¦¨à¦«à¦¾à¦°à§à¦®à§‡à¦¶à¦¨à§‡à¦°
                            à¦œà¦¨à§à¦¯ à¦…à¦ªà§‡à¦•à§à¦·à¦¾ à¦•à¦°à§à¦¨à¥¤ à¦…à¦°à§à¦¡à¦¾à¦° ID:{" "}
                            <strong>#{createdOrder?._id?.substring(0, 8)}</strong>
                          </p>
                          <Link
                            href="/account"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition mt-3"
                          >
                            <ShoppingBag size={18} /> à¦†à¦®à¦¾à¦° à¦…à¦°à§à¦¡à¦¾à¦°à¦—à§à¦²à§‹ à¦¦à§‡à¦–à§à¦¨
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* ================= SSL Full ================= */}
                    <label
                      disabled
                      className={`flex items-center p-3 rounded-xl border cursor-pointer
        ${selectedPayment === "ssl" ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}
      `}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="ssl"
                        checked={selectedPayment === "ssl"}
                        onChange={() => setSelectedPayment("ssl")}
                        className="mr-3"
                      />

                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <div className="font-medium">One-click (SSLCommerz) â€” Full</div>
                          <div className="text-xs text-gray-500">
                            à¦¶à§à¦§à§ à¦•à§à¦²à¦¿à¦• à¦•à¦°à§à¦¨ à¦à¦¬à¦‚ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦—à§‡à¦Ÿà¦“à¦¯à¦¼à§‡ à¦–à§à¦²à¦¬à§‡
                          </div>
                        </div>

                        <div className="text-sm font-semibold text-gray-700">
                          à§³{(subtotal + deliveryCharge).toLocaleString()}
                        </div>
                      </div>
                    </label>

                    {/* ================= SSL Delivery ================= */}
                    <label
                      disabled
                      className={`flex items-center p-3 rounded-xl border cursor-pointer
        ${
          selectedPayment === "ssl-delivery"
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-white"
        }
      `}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="ssl-delivery"
                        checked={selectedPayment === "ssl-delivery"}
                        onChange={() => setSelectedPayment("ssl-delivery")}
                        className="mr-3"
                      />

                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Pay Delivery Fee Only (SSL)</div>
                          <div className="text-xs text-gray-500">
                            à¦†à¦—à§‡ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦«à¦¿ à¦¦à¦¿à¦¨, à¦ªà¦°à§‡ à¦¬à¦¾à¦•à¦¿ à¦•à¦¨à¦«à¦¾à¦°à§à¦®
                          </div>
                        </div>

                        <div className="text-sm font-semibold text-gray-700">à§³{deliveryCharge}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-4 p-3 bg-green-50 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">à§§à§¦à§¦% à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (selectedPayment !== "ssl") {
                        setSelectedPayment("ssl");
                        return;
                      }
                      handleProceedToPayment({ payDeliveryOnly: false });
                    }}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                  >
                    {isProcessing ? "à¦ªà§à¦°à¦¸à§‡à¦¸à¦¿à¦‚ à¦¹à¦šà§à¦›à§‡..." : "One-Click SSL â€” Full"}
                  </button>

                  <button
                    onClick={() => {
                      if (selectedPayment !== "ssl-delivery") {
                        setSelectedPayment("ssl-delivery");
                        return;
                      }
                      handleProceedToPayment({ payDeliveryOnly: true });
                    }}
                    disabled={isProcessing}
                    className="w-full border border-gray-300 py-3 rounded-xl font-semibold"
                  >
                    {isProcessing ? "à¦ªà§à¦°à¦¸à§‡à¦¸à¦¿à¦‚ à¦¹à¦šà§à¦›à§‡..." : `Pay Delivery Only (à§³${deliveryCharge})`}
                  </button>

                  <button
                    onClick={() => {
                      if (selectedPayment !== "manual") {
                        setSelectedPayment("manual");
                        setManualOrderStep("initial"); // Reset step when selecting manual payment
                      }
                      const el = document.querySelector(".manual-payment-section"); // Add a class to the manual payment div
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    disabled={isProcessing}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                  >
                    Pay Manually (Bkash / Nagad)
                  </button>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  à¦…à¦°à§à¦¡à¦¾à¦° à¦•à¦¨à¦«à¦¾à¦°à§à¦® à¦•à¦°à¦¾à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦†à¦ªà¦¨à¦¿ à¦†à¦®à¦¾à¦¦à§‡à¦°{" "}
                  <span className="text-blue-600 font-medium">à¦¶à¦°à§à¦¤à¦¾à¦¬à¦²à§€</span> à¦®à§‡à¦¨à§‡ à¦¨à¦¿à¦šà§à¦›à§‡à¦¨
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
