"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "@/api-client";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RegistrationFormInput } from "@/constants/types";



const RegisterPage = () => {
  //to do bug fix weak password handle
  const router = useRouter();
  const { toast } = useToast();
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormInput>();

  const mutation = useMutation(apiClient.userRegistrationFormApiCall, {
    onSuccess: () => {
      reset();
      toast({
        title: "User registered successfully",
      });
      router.push(`/`);
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="flex items-center justify-center md:h-[calc(100vh-80px)]">
      <div className="max-w-xs rounded-none bg-white p-4 shadow-input dark:bg-black md:max-w-lg md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Sign in or create an account
        </h2>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                className={`${errors.firstName ? "focus-visible:ring-red-500" : " "}`}
                id="firstname"
                placeholder="Tyler"
                type="text"
                {...register("firstName", {
                  required: "This field is required",
                  maxLength: 20,
                })}
              />
              {errors.firstName && (
                <span className=" text-xs font-semibold text-red-600">
                  {errors.firstName.message}
                </span>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                className={`${errors.lastName ? "focus-visible:ring-red-500" : " "}`}
                id="lastname"
                placeholder="Durden"
                type="text"
                {...register("lastName", {
                  required: "This field is required",
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors.lastName && (
                <span className=" text-xs font-semibold text-red-600">
                  {errors.lastName.message}
                </span>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              className={`${errors.email ? "focus-visible:ring-red-500" : " "}`}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register("email", {
                required: "This field is required",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              className={`${errors.password ? "focus-visible:ring-red-500" : " "}`}
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 8,
                  message:
                    "Please enter a password with a minimum length of 6 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed 10 characters",
                },
              })}
            />
            {errors.password && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.password.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Your confirm password</Label>
            <Input
              className={`${errors.confirmPassword ? "focus-visible:ring-red-500" : " "}`}
              id="twitterpassword"
              placeholder="••••••••"
              type="twitterpassword"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) return "This field is required";
                  if (watch("password") !== value) return "Password not match";
                },
              })}
            />
            {errors.confirmPassword && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="pt-4">
            <Link href={"/sign-in"}>
              <p className="text-sm">Already registered?</p>
            </Link>
          </div>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="grid grid-cols-2 justify-between gap-5 md:grid-cols-3 ">
            <button
              className=" group/btn relative flex h-10 items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className=" group/btn relative flex h-10 items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>
            <button
              className=" group/btn relative flex h-10 items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Facebook
              </span>
              <BottomGradient />
            </button>
          </div>
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div>
            <p className="text-center text-xs">
              By signing in or creating an account, you agree with our{" "}
              <span className="cursor-pointer text-blue-500 hover:underline">
                Terms & conditions
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-blue-500 hover:underline">
                Privacy statement
              </span>
            </p>
            <p className="pt-2 text-center text-xs">
              All rights reserved. <br />
              Copyright (2006 - 2024) - Wooking.com
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default RegisterPage;
