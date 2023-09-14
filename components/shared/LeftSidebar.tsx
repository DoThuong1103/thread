"use client";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "@/constants/";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
export const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isAcctive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link?.route}
              key={link?.label}
              className={`leftsidebar_link ${isAcctive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link?.label}
                width={24}
                height={24}
              ></Image>
              <span className="text-light-1 max-lg:hidden">{link?.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex gap-4 p-4 cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};
