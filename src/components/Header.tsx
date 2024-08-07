"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { navbarLinks } from "@/constants/navlinks";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "@/api-client";
import { useToast } from "./ui/use-toast";
import { ButtonsCard } from "./ui/tailwindcss-buttons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAppContext();
  const mutation = useMutation("logout", apiClient.signOut, {
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

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <header className="bg-blue-800">
      <div className="mx-auto flex items-center justify-between p-4 py-6 md:container">
        <span className="text-2xl font-bold text-white">
          <Link href={`/`} >Properties.com </Link>
        </span>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-3 md:flex">
          {
            <div className="cursor-pointer rounded-lg p-2.5 text-sm font-bold text-white hover:bg-blue-500/30">
              <button onClick={() => router.push(`/property-listing`)}>
                List your property
              </button>
            </div>
          }
          {isLoggedIn ? (
            <>
              <ButtonsCard
                onClick={() => handleClick()}
                className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Sign Out
              </ButtonsCard>
            </>
          ) : (
            <>
              <ButtonsCard
                onClick={() => router.push(`/register`)}
                className="rounded-md p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Register
              </ButtonsCard>
              <ButtonsCard
                onClick={() => router.push(`/sign-in`)}
                className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
              >
                Sign In
              </ButtonsCard>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div onClick={toggleNavbar} className="z-50 block text-white md:hidden">
          {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Items */}
        <ul
          className={
            isOpen
              ? "fixed right-0 top-0 h-full w-[100%] border-r border-r-gray-900 bg-blue-900 duration-500 ease-in-out md:hidden"
              : "fixed bottom-0 right-[-100%] top-0 w-[60%] duration-500 ease-in-out"
          }
        >
          {/* Mobile Logo */}
          <h1 className="m-4 w-full pt-3 text-xl font-bold text-white">
          Properties.com
          </h1>

          {/* Mobile Navigation Items */}
          <div className="my-5 flex flex-col gap-5 p-5 text-center">
            {
              <ButtonsCard
                className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
                onClick={() => {
                  router.push(`/property-listing`);
                  setIsOpen(false);
                }}
              >
                List your property
              </ButtonsCard>
            }
            {isLoggedIn ? (
              <>
                <ButtonsCard
                  onClick={() => handleClick()}
                  className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
                >
                  Sign Out
                </ButtonsCard>
              </>
            ) : (
              <>
                <ButtonsCard
                  onClick={() => {
                    router.push(`/register`);
                    setIsOpen(false);
                  }}
                  className="rounded-md p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
                >
                  Register
                </ButtonsCard>
                <ButtonsCard
                  onClick={() => {
                    router.push(`/sign-in`);
                    setIsOpen(false);
                  }}
                  className="rounded-md bg-white p-2 text-xs font-semibold text-blue-600 hover:bg-neutral-100"
                >
                  Sign In
                </ButtonsCard>
              </>
            )}
          </div>
        </ul>
      </div>

      <nav className="no-scrollbar mx-auto flex items-center justify-start gap-2 overflow-auto py-2 md:container md:overscroll-none">
        {navbarLinks.map((link, index) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <div
              key={index}
              className="min-w-max cursor-pointer text-sm text-white md:min-h-10"
            >
              <Link
                href={link.route}
                className={`flex flex-grow items-center justify-center gap-2 rounded-full  border px-5 py-2 hover:bg-blue-500/25
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
