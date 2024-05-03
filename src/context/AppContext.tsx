"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "@/api-client";

type AppContextValue = {
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context as AppContextValue;
};
