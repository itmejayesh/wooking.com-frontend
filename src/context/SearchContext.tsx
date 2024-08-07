"use client";
import React, { createContext, useContext, useState } from "react";

type SearchContext = {
  location: string;
  propertyType: string;
  propertySize: string;
  saveSearchValues: (
    location: string,
    propertyType: string,
    propertySize: string,
  ) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [propertySize, setPropertySize] = useState<string>("");

  const saveSearchValues = (
    location: string,
    propertyType: string,
    propertySize: string,
  ) => {
    setLocation(location);
    setPropertyType(propertyType);
    setPropertySize(propertySize);
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        propertySize,
        propertyType,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  const [] = useState();

  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within an SearchContextProvider",
    );
  }

  return context as SearchContext;
};
