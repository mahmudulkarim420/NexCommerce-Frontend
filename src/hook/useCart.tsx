import { cartService } from "../services/cart.service";
import {
  cartAdd,
  cartClear,
  cartError,
  cartLoading,
  cartRemove,
  cartSuccess,
  cartUpdate,
} from "../redux/cartSlice";

export const getCartApi = async (userId: string, dispatch: any) => {
  try {
    dispatch(cartLoading());
    const cart = await cartService.getCart(userId);
    dispatch(cartSuccess(cart.items || []));
  } catch (error) {
    dispatch(cartError("Get cart failed"));
  }
};

export const addToCartApi = async (productData: any, dispatch: any) => {
  try {
    dispatch(cartLoading());
    const userId = "temp_user_id";
    const res = await cartService.addItem({
      userId,
      productId: productData.id || productData.productId,
      quantity: productData.quantity || 1,
      price: productData.price,
    });
    dispatch(
      cartAdd({
        ...productData,
        quantity: productData.quantity || 1,
        productId: productData.id || productData.productId,
      }),
    );
  } catch (error) {
    dispatch(cartError("Add to cart failed"));
  }
};

export const updateCartItemApi = async (updateData: any, dispatch: any) => {
  try {
    const userId = "temp_user_id";
    await cartService.updateItem({
      userId,
      productId: updateData.productId,
      quantity: updateData.quantity,
    });
    dispatch(cartUpdate(updateData));
  } catch (error) {
    dispatch(cartError("Update cart failed"));
  }
};

export const removeCartItemApi = async (userId: string, productId: string, dispatch: any) => {
  try {
    await cartService.removeItem(userId, productId);
    dispatch(cartRemove(productId));
  } catch (error) {
    dispatch(cartError("Remove cart failed"));
  }
};

export const clearCartApi = async (userId: string, dispatch: any) => {
  try {
    await cartService.clearCart(userId);
    dispatch(cartClear());
  } catch (error) {
    dispatch(cartError("Clear cart failed"));
  }
};
