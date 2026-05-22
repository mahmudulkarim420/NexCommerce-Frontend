import { orderService } from "../services/order.service";

export const OrderCreate = async (formData: any) => {
  try {
    const data = await orderService.create(formData);
    return { success: true, data, message: "Order created successfully!" };
  } catch (error) {
    throw error;
  }
};

export const OrderAllAdminGet = async () => {
  try {
    const res = await orderService.getAllOrders();
    return { success: true, data: res.orders };
  } catch (error) {
    throw error;
  }
};

export const OrderAllGet = async () => {
  try {
    const userId = "temp_user_id";
    const orders = await orderService.getAll(userId);
    return { success: true, data: orders };
  } catch (error) {
    throw error;
  }
};

export const OrderUpdate = async (orderId: string, status: any) => {
  try {
    const data = await orderService.updateStatus(orderId, status);
    return { success: true, data, message: "Order updated successfully!" };
  } catch (error) {
    throw error;
  }
};

export const OrderDelete = async (orderId: string) => {
  try {
    await orderService.cancel(orderId); // fallback
    return { success: true, message: "Order deleted successfully!" };
  } catch (error) {
    throw error;
  }
};
