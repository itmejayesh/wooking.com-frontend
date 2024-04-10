"use client";
import React from "react";
import { cn } from "@/utils/cn";

export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/btn relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-white text-sm ring-1 ring-blue-500 ring-offset-1 ring-offset-transparent hover:border-neutral-200 dark:border-white/[0.2] dark:bg-black",
        className,
      )}
    >
      <div className="dark:bg-dot-white/[0.1] bg-dot-black/[0.1] absolute inset-0" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
