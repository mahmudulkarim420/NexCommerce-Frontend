import { wishlistService } from "../services/wishlist.service";
import {
  wishlistAdd,
  wishlistClear,
  wishlistError,
  wishlistLoading,
  wishlistSet,
} from "../redux/wishlistSlice";

export const getWishlistApi = async (dispatch: any) => {
  try {
    dispatch(wishlistLoading());
    const userId = "temp_user_id";
    const wishlist = await wishlistService.getWishlist(userId);
    dispatch(wishlistSet(wishlist.items || []));
  } catch (error) {
    dispatch(wishlistError("Failed to load wishlist"));
  }
};

export const addToWishlistApi = async (productId: string, dispatch: any) => {
  try {
    dispatch(wishlistLoading());
    const userId = "temp_user_id";
    await wishlistService.addItem(userId, productId);
    dispatch(wishlistAdd({ productId }));
  } catch (error) {
    dispatch(wishlistError("Add failed"));
  }
};

export const removeFromWishlistApi = async (productId: string, dispatch: any) => {
  try {
    dispatch(wishlistLoading());
    const userId = "temp_user_id";
    await wishlistService.removeItem(userId, productId);
    await getWishlistApi(dispatch);
  } catch (error) {
    dispatch(wishlistError("Remove failed"));
  }
};

export const clearWishlistApi = async (dispatch: any) => {
  try {
    const userId = "temp_user_id";
    await wishlistService.clearWishlist(userId);
    dispatch(wishlistClear());
  } catch (error) {
    dispatch(wishlistError("Clear failed"));
  }
};
