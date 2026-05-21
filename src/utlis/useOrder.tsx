import { demoOrders, simulateDelay } from "../data/demoData";

// Create Order
export const OrderCreate = async (formData) => {
  try {
    await simulateDelay(1000);

    const newOrder = {
      _id: `order${Date.now()}`,
      orderNumber: `ORD-2024-${String(demoOrders.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "pending",
      paymentStatus: formData.paymentMethod === "cod" ? "pending" : "paid",
      createdAt: new Date().toISOString(),
    };

    demoOrders.push(newOrder);

    return {
      success: true,
      data: newOrder,
      message: "Order created successfully!",
    };
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
};

// Get All Orders (Admin)
export const OrderAllAdminGet = async () => {
  try {
    await simulateDelay(600);

    return { success: true, data: demoOrders };
  } catch (error) {
    console.error("Admin order fetch error:", error);
    throw error;
  }
};

// Get My Orders (Customer)
export const OrderAllGet = async () => {
  try {
    await simulateDelay(600);

    // Filter orders for current user (demo: user2)
    const myOrders = demoOrders.filter((order) => order.userId === "user2");

    return { success: true, data: myOrders };
  } catch (error) {
    console.error("Order fetch error:", error);
    throw error;
  }
};

// Update Order Status
export const OrderUpdate = async (orderId, status) => {
  try {
    await simulateDelay(800);

    const orderIndex = demoOrders.findIndex((o) => o._id === orderId);
    if (orderIndex !== -1) {
      demoOrders[orderIndex].status = status;

      // Update timestamps based on status
      if (status === "shipped") {
        demoOrders[orderIndex].shippedAt = new Date().toISOString();
      } else if (status === "delivered") {
        demoOrders[orderIndex].deliveredAt = new Date().toISOString();
        demoOrders[orderIndex].paymentStatus = "paid";
      }

      return {
        success: true,
        data: demoOrders[orderIndex],
        message: "Order updated successfully!",
      };
    }

    return { success: false, message: "Order not found" };
  } catch (error) {
    console.error("Order update error:", error);
    throw error;
  }
};

// Delete Order
export const OrderDelete = async (orderId) => {
  try {
    await simulateDelay(600);

    const orderIndex = demoOrders.findIndex((o) => o._id === orderId);
    if (orderIndex !== -1) {
      demoOrders.splice(orderIndex, 1);
      return { success: true, message: "Order deleted successfully!" };
    }

    return { success: false, message: "Order not found" };
  } catch (error) {
    console.error("Order delete error:", error);
    throw error;
  }
};
