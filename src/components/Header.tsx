"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { ButtonsCard } from "./ui/tailwindcss-buttons";
import Image from "next/image";
import { navbarLinks } from "@/constants/navlinks";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "@/api-client";
import { useToast } from "./ui/use-toast";

const Header = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAppContext();
  const mutation = useMutation("logout", apiClient.singOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast({
        title: "Logout successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
      });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <header className="bg-blue-800">
      <div className="container mx-auto flex items-center justify-between py-6">
        <span className="text-2xl font-bold text-white">
          <Link href={`/`}>Wooking.com </Link>
        </span>

        <div className="flex space-x-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleClick()}
                className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <ButtonsCard
                onClick={() => router.push(`/register`)}
                className="rounded-md p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Register
              </ButtonsCard>
              <button
                onClick={() => router.push(`/sign-in`)}
                className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Sign In
              </button>
            </>
          )}
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
