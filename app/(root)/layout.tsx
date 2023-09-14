import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Topbar } from "@/components/shared/Topbar";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { RightSidebar } from "@/components/shared/RightSidebar";
import { Bottombar } from "@/components/shared/Bottombar";
import "../globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Theards",
  description: "A next.js 13 Meta Threads",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
