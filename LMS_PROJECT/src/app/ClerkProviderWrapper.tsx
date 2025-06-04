// src/components/ClerkProviderWrapper.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {children}
      <ToastContainer position="bottom-right" theme="dark" />
    </ClerkProvider>
  );
}
