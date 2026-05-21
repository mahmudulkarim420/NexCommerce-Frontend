import { demoCart, simulateDelay } from "../data/demoData";
import {
  cartAdd,
  cartClear,
  cartError,
  cartLoading,
  cartRemove,
  cartSuccess,
  cartUpdate,
} from "../redux/cartSlice";

// ------------------------ GET CART ------------------------
export const getCartApi = async (userId, dispatch) => {
  try {
    dispatch(cartLoading());
    await simulateDelay(600);
    dispatch(cartSuccess(demoCart));
  } catch (error) {
    dispatch(cartError("Get cart failed"));
  }
};

// ------------------------ ADD ------------------------
export const addToCartApi = async (productData, dispatch) => {
  try {
    await simulateDelay(500);
    // Simulate add
    const newItem = {
      ...productData,
      quantity: productData.quantity || 1,
    };
    demoCart.push(newItem);
    dispatch(cartAdd(newItem));
  } catch (error) {
    dispatch(cartError("Add to cart failed"));
  }
};

// ------------------------ UPDATE ------------------------
export const updateCartItemApi = async (updateData, dispatch) => {
  try {
    await simulateDelay(500);
    const index = demoCart.findIndex((item) => item.productId === updateData.productId);
    if (index !== -1) {
      demoCart[index].quantity = updateData.quantity;
      dispatch(cartUpdate(demoCart[index]));
    }
  } catch (error) {
    dispatch(cartError("Update cart failed"));
  }
};

// ------------------------ REMOVE ------------------------
export const removeCartItemApi = async (userId, productId, dispatch) => {
  try {
    await simulateDelay(500);
    const index = demoCart.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      demoCart.splice(index, 1);
      dispatch(cartRemove(productId));
    }
  } catch (error) {
    dispatch(cartError("Remove cart failed"));
  }
};

// ------------------------ CLEAR ------------------------
export const clearCartApi = async (userId, dispatch) => {
  try {
    await simulateDelay(500);
    demoCart.length = 0; // Clear the array
    dispatch(cartClear());
  } catch (error) {
    dispatch(cartError("Clear cart failed"));
  }
};
