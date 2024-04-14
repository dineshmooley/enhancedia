"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./(components)/ui/sonner";

type sessionProps = {
  children: React.ReactNode;
};
function NextAuthSessionProvider({ children }: sessionProps) {
  return (
    <SessionProvider>
      {children} <Toaster />
    </SessionProvider>
  );
}

export default NextAuthSessionProvider;
