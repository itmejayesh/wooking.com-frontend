import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-10">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tracking-tighter text-white">
          Wooking.com
        </span>
        <p className="my-2 text-xs tracking-wider text-white">
          Copyright © 1996–2024 Booking.com™. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
