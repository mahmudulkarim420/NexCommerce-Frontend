"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/redux/store";

/**
 * Redux Provider with Persistence
 *
 * This component wraps the entire application to provide Redux state management
 * with persistence capabilities. The PersistGate delays rendering until the
 * persisted state has been retrieved and saved to redux.
 *
 * @param children - React children to be wrapped
 */

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
