"use client";
import Link from "next/link";
import React from "react";
import { ButtonsCard } from "./ui/tailwindcss-buttons";
import Image from "next/image";
import { navbarLinks } from "@/constants/navlinks";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-blue-800">
      <div className="container mx-auto flex items-center justify-between py-6">
        <span className="text-2xl font-bold text-white">
          <Link href={`/`}>Wooking.com </Link>
        </span>

        <div className="flex space-x-3">
          <ButtonsCard className="rounded-md p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100">
            Register
          </ButtonsCard>
          <ButtonsCard className="rounded-md p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100">
            Sign In
          </ButtonsCard>
        </div>
      </div>

      <nav className="container mx-auto flex flex-wrap py-2">
        {navbarLinks.map((link, index) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <div
              key={index}
              className="min-h-10 cursor-pointer text-sm text-white"
            >
              <Link
                href={link.route}
                className={`flex w-fit items-center gap-3 rounded-full border  px-4 py-2 hover:bg-blue-500/25
                 ${isActive ? "border-white bg-blue-500/25" : "border-transparent"}`}
              >
                <Image src={link.imgUrl} width={20} height={20} alt="" />
                <h4 className="text-xs font-medium">{link.name}</h4>
              </Link>
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
