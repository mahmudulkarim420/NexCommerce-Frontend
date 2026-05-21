import { demoOrders, simulateDelay, getCurrentUser } from "../data/demoData";

// ✅ Create manual payment order
export const createManualPaymentOrder = async (formData) => {
  try {
    await simulateDelay(1000);
    const user = getCurrentUser();
    const newOrder = {
      _id: `order${Date.now()}`,
      userId: user._id,
      orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };
    demoOrders.push(newOrder);
    return { success: true, data: newOrder, message: "Order created successfully (Manual)" };
  } catch (error) {
    console.error("Manual order creation error:", error);
    throw error;
  }
};

// ✅ Create SSL payment order
export const createSslPaymentOrder = async (formData) => {
  try {
    await simulateDelay(1000);
    const user = getCurrentUser();
    const newOrder = {
      _id: `order${Date.now()}`,
      userId: user._id,
      orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };
    demoOrders.push(newOrder);
    return { success: true, data: newOrder, redirectUrl: "https://securepay.sslcommerz.com/demo" };
  } catch (error) {
    console.error("SSL order creation error:", error);
    throw error;
  }
};

export const submitManualPayment = async (data) => {
  try {
    await simulateDelay(800);
    const order = demoOrders.find((o) => o._id === data.orderId);
    if (order) {
      order.paymentStatus = "paid";
      order.paymentDetails = data;
    }
    return { success: true, message: "Payment submitted successfully" };
  } catch (error) {
    console.error("Manual payment error:", error);
    throw error;
  }
};

// ✅ Initialize SSLCommerz payment session
export const initPaymentSession = async (payload) => {
  try {
    await simulateDelay(1000);
    return { success: true, GatewayPageURL: "https://securepay.sslcommerz.com/demo" };
  } catch (error) {
    console.error("Payment init error:", error);
    throw error;
  }
};
