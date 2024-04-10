import React from "react";

const Hero = () => {
  return (
    <div className="flex bg-gradient-to-b from-blue-800 to-blue-900 p-16">
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-white">Find your next stay</h1>
        <p className="text-2xl text-white">
          Search low prices on hotels, homes and much more...
        </p>
      </div>
    </div>
  );
};

export default Hero;
