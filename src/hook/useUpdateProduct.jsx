import { demoCart, simulateDelay } from "../data/demoData";

// Update product quantity in cart
export const updateProductQuantityApi = async (updateData, dispatch) => {
  try {
    await simulateDelay(400);
    const index = demoCart.findIndex((item) => item.productId === updateData.productId);
    if (index !== -1) {
      demoCart[index].quantity = updateData.quantity;
      return { success: true, data: demoCart[index] };
    }
    return { success: false, message: "Item not found in cart" };
  } catch (error) {
    throw "Update failed";
  }
};

// Increase product quantity
export const increaseProductQuantity = async (userId, productId, currentQuantity, dispatch) => {
  try {
    const newQuantity = currentQuantity + 1;
    const res = await updateProductQuantityApi(
      {
        userId,
        productId,
        quantity: newQuantity,
      },
      dispatch,
    );
    return res;
  } catch (error) {
    throw error;
  }
};

// Decrease product quantity
export const decreaseProductQuantity = async (userId, productId, currentQuantity, dispatch) => {
  try {
    const newQuantity = Math.max(1, currentQuantity - 1);
    const res = await updateProductQuantityApi(
      {
        userId,
        productId,
        quantity: newQuantity,
      },
      dispatch,
    );
    return res;
  } catch (error) {
    throw error;
  }
};
