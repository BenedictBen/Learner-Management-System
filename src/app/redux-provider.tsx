"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "../lib/store";
import { AuthInitializer } from "@/features/AuthInitializer"
import { SessionProvider } from "next-auth/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>
    <SessionProvider>

    <AuthInitializer>
    {children}
    </AuthInitializer>

    </SessionProvider>
    </Provider>;
}

