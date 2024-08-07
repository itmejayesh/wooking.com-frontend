import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
