import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import orderSlice from "./orderSlice";
import productReducer from "./productSlice";
import searchReducer from "./searchSlice";
import subcategoryRoute from "./subcategorySlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";

/**
 * Redux Persist Configuration
 * Whitelist only cart, user, and wishlist to persist across page reloads
 */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "user", "wishlist"], // Only these slices will be persisted
};

/**
 * Combine all reducers
 */
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  subcategory: subcategoryRoute,
  wishlist: wishlistReducer,
  cart: cartReducer,
  order: orderSlice,
  search: searchReducer,
});

/**
 * Create persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure Redux store with persistence
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that contain non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

/**
 * Create persistor for PersistGate
 */
export const persistor = persistStore(store);

/**
 * TypeScript types for Redux
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
