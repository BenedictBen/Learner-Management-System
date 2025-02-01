"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "../lib/store";
import { AuthInitializer } from "@/features/AuthInitializer"

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>
    <AuthInitializer>
    {children}
    </AuthInitializer>
    </Provider>;
}

