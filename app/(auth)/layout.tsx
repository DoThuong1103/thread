import { title } from "process";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";

export const metadata = {
  title: "Theards",
  description: "A next.js 13 Meta Threads",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <body className={`${inter.className} bg-dark-1  `}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
