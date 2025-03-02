"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "../lib/store";
import { AuthInitializer } from "@/features/AuthInitializer"
import { SessionProvider } from "next-auth/react";
import { SessionInitializer } from "@/components/SessionInitializer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {  
  return <Provider store={store}>
    <SessionInitializer>

    
    <SessionProvider>

    <AuthInitializer>
    {children}
    </AuthInitializer>

    </SessionProvider>
    </SessionInitializer>
    </Provider>;
}

