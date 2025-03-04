"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store, persistor  } from "../lib/store";
import { AuthInitializer } from "@/features/AuthInitializer"
import { SessionProvider } from "next-auth/react";
import { SessionInitializer } from "@/components/SessionInitializer";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {  
  return <Provider store={store}>
    <SessionInitializer>

    
    <SessionProvider>

    <AuthInitializer>
      <PersistGate persistor={persistor}>
      
    {children}
      </PersistGate>
    </AuthInitializer>

    </SessionProvider>
    </SessionInitializer>
    </Provider>;
}

