import React from "react";

const Hero = () => {
  return (
    <div className="flex bg-gradient-to-b from-blue-800 to-blue-900 p-4 md:p-16">
      <div className="mx-auto flex flex-col gap-2 md:container">
        <h1 className="text-2xl font-bold text-white md:text-5xl">
          Find your next stay
        </h1>
        <p className="text-sm text-white  md:text-2xl">
          Search low prices on hotels, homes and much more...
        </p>
      </div>
    </div>
  );
};

export default Hero;
