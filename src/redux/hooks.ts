import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Typed Redux Hooks
 *
 * Use these hooks instead of plain `useDispatch` and `useSelector`
 * for better TypeScript support and autocompletion.
 */

/**
 * Typed useDispatch hook
 *
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(fetchProducts());
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook
 *
 * @example
 * const user = useAppSelector((state) => state.user);
 * const cartItems = useAppSelector((state) => state.cart.items);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
