"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "@/api-client";
import { useToast } from "./ui/use-toast";
import { PropertyFormData } from "@/constants/types";
import { useAppContext } from "@/context/AppContext";

//configs
const PropertyTags = [
  "Budget",
  "Luxury",
  "Family-friendly",
  "Gated community",
  "Pet-friendly",
  "Mountain view",
  "Water view",
  "Family",
  "Romantic",
  "Cabin",
  "Beach Resort",
  "Hiking Resort",
  "Gold Resort",
];

const PropertyFeatures = [
  "Parking",
  "Swimming Pool",
  "Spa/Wellness Center",
  "Conference Rooms",
  "Laundry Facilities",
  "Concierge Services",
  "Fitness Center",
  "Housekeeping",
  "Wi-Fi/Internet Access",
  "Air Conditioner ",
];

export function PropertyForm() {
  const { toast } = useToast();
  const { isLoggedIn } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>();

  const tagWatch = watch("type");

  const mutation = useMutation((formData: FormData) => apiClient.addProperty(formData), {
    onSuccess: () => {
      reset();
      toast({
        title: "Property listed successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
    if (isLoggedIn) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('location', data.location);
      formData.append('city', data.city);
      formData.append('country', data.country);
      formData.append('description', data.description);
      formData.append('pricePerNights', data.pricePerNights.toString());
      formData.append('starRating', data.starRating.toString());
      formData.append('type', data.type);
      formData.append('adultsCount', data.adultsCount.toString());
      formData.append('childCount', data.childCount.toString());
      data.facilities.forEach((facility, index) => formData.append(`facilities[${index}]`, facility));
      Array.from(data.imageFiles).forEach((imageFile) => formData.append('imageFiles', imageFile));
  
      mutation.mutate(formData);
    } else {
      toast({
        title: "Please Login",
        variant: "destructive",
      });
    }
  };
  

  return (
    <section className="m-5 mx-auto h-full max-w-xs rounded-none bg-white p-4 shadow-input dark:bg-black md:max-w-2xl md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Add Your Property Here
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              className={`${errors.name ? "focus-visible:ring-red-500" : " "}`}
              id="name"
              type="text"
              {...register("name", {
                required: "This field is required",
                maxLength: 20,
              })}
            />
            {errors.name && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.name.message}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="location">Location</Label>
            <Input
              className={`${errors.location ? "focus-visible:ring-red-500" : " "}`}
              id="location"
              type="text"
              {...register("location", {
                required: "This field is required",
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.location && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.location.message}
              </span>
            )}
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="city">City</Label>
            <Input
              className={`${errors.city ? "focus-visible:ring-red-500" : " "}`}
              id="city"
              type="text"
              {...register("city", {
                required: "This field is required",
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.city && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.city.message}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="country">Country</Label>
            <Input
              className={`${errors.country && "focus-visible:ring-red-500"}`}
              id="country"
              type="text"
              {...register("country", {
                required: "This field is required",
              })}
            />
            {errors.country && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.country.message}
              </span>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Description</Label>
          <textarea
            rows={6}
            className={`rounded-xl ${errors.description ? "focus-visible:ring-red-500" : ""}`}
            id="description"
            {...register("description", {
              validate: (text) => {
                if (text.length === 0) {
                  return "Please add short description";
                }
              },
            })}
          />
          {errors.description && (
            <span className=" text-xs font-semibold text-red-600">
              {errors.description.message}
            </span>
          )}
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="pricePerNights">Price Per Nights</Label>
            <Input
              className={`rounded-lg bg-gray-400/5 ${errors.pricePerNights ? "focus-visible:ring-red-500" : " "}`}
              id="pricePerNights"
              type="number"
              min={0}
              {...register("pricePerNights", {
                required: "this field is required",
              })}
            />
            {errors.pricePerNights && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.pricePerNights.message}
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="starRating">Star Rating</Label>
            <Input
              className={`rounded-lg bg-gray-400/5 ${errors.starRating ? "focus-visible:ring-red-500" : " "}`}
              id="starRating"
              type="number"
              min={1}
              max={5}
              {...register("starRating", {
                required: "this field is required",
                minLength: {
                  value: 1,
                  message: "Please enter a valid  value minimum 1",
                },
                maxLength: {
                  value: 5,
                  message: "Please enter a valid  value maximum upto 5",
                },
              })}
            />
            {errors.starRating && (
              <span className=" text-xs font-semibold text-red-600">
                {errors.starRating.message}
              </span>
            )}
          </LabelInputContainer>
        </div>

        <div className="mb-4">
          <Label>Types</Label>
          <div className="mb mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
            {PropertyTags.map((type, index) => (
              <LabelInputContainer className="mb-4" key={index}>
                <Label
                  htmlFor={`type-${index}`}
                  className={`flex cursor-pointer items-center justify-center gap-x-1 text-wrap rounded-lg bg-slate-500/20 p-3 ${tagWatch === type ? "bg-blue-500" : ""}`}
                >
                  <Input
                    className={`hidden`}
                    id={`type-${index}`}
                    type="radio"
                    value={type}
                    {...register("type", {
                      required: "This field is required",
                    })}
                  />
                  <span className="text-xs font-medium">{type}</span>
                </Label>
              </LabelInputContainer>
            ))}
          </div>
          {errors.type && (
            <span className="text-xs font-semibold text-red-600">
              {errors.type.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <Label>Facilities</Label>
          <div className="mt-2 grid grid-cols-2 gap-x-1 md:grid-cols-4">
            {PropertyFeatures.map((fac, index) => (
              <LabelInputContainer className="mb-4" key={index}>
                <Label
                  htmlFor={`fac-${index}`}
                  className={`flex cursor-pointer items-center justify-start gap-x-1 pl-1`}
                >
                  <Input
                    id={`fac-${index}`}
                    type="checkbox"
                    value={fac}
                    {...register("facilities", {
                      validate: (facilities) => {
                        if (facilities && facilities.length > 0) {
                          return true;
                        } else {
                          return "At least one facilities is required";
                        }
                      },
                    })}
                  />
                  <span className="text-xs font-medium">{fac}</span>
                </Label>
              </LabelInputContainer>
            ))}
          </div>
          {errors.facilities && (
            <span className="text-xs font-semibold text-red-600">
              {errors.facilities.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <Label>Guest</Label>
          <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <LabelInputContainer>
              <Label htmlFor="adultsCount">Adults</Label>
              <Input
                id="adultsCount"
                type="number"
                min={1}
                max={5}
                {...register("adultsCount", {
                  required: "this field is required",
                  minLength: {
                    value: 1,
                    message: "Please enter a valid  value minimum 1",
                  },
                  maxLength: {
                    value: 5,
                    message: "Please enter a valid  value maximum upto 5",
                  },
                })}
              />
              {errors.adultsCount && (
                <span className=" text-xs font-semibold text-red-600">
                  {errors.adultsCount.message}
                </span>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="childCount">Child</Label>
              <Input
                className={`rounded-lg bg-gray-400/5 ${errors.childCount ? "focus-visible:ring-red-500" : " "}`}
                id="childCount"
                type="number"
                min={0}
                {...register("childCount", {
                  required: "this field is required",
                })}
              />
              {errors.childCount && (
                <span className=" text-xs font-semibold text-red-600">
                  {errors.childCount.message}
                </span>
              )}
            </LabelInputContainer>
          </div>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="imageFiles">Upload Images</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            id="imageFiles"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const totalLength = imageFiles.length;
                if (totalLength === 0) {
                  return "At least one images should be added";
                }
                if (totalLength > 6) {
                  return "Total number of images cannot be more than 6";
                }
              },
            })}
          />
          {errors.imageFiles && (
            <span className=" text-xs font-semibold text-red-600">
              {errors.imageFiles.message}
            </span>
          )}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit Details &rarr;
          <BottomGradient />
        </button>
      </form>
    </section>
  );
}

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
