import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-4 md:py-10 ">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <span className="text-xl font-bold tracking-tighter text-white md:text-3xl">
          Properties.com
        </span>
        <p className="my-2 text-center text-xs tracking-wider text-white">
          Copyright © 1996–2024 Properties.com™. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
