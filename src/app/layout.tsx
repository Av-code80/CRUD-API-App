"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./tailwind.css";
import { queryClient } from "@/utils/queryClient";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
