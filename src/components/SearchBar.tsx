import React from "react";
import { FaHouseDamage } from "react-icons/fa";
import { GiHouseKeys } from "react-icons/gi";
import { MdLocationCity, MdTravelExplore } from "react-icons/md";

const SearchBar = () => {
  return (
    <form className=" -mt-8 grid grid-cols-2 items-center rounded-md bg-orange-400 p-1.5 shadow-md md:grid-cols-3 xl:grid-cols-5">
      <div className="flex flex-1 flex-row items-center bg-white p-2">
        <MdLocationCity size={25} className="m-2" />
        <input
          type="text"
          placeholder="Prperty Location"
          className="w-full text-sm focus:outline-none"
        />
      </div>
      <div className="flex flex-1 flex-row items-center bg-white p-2">
        <FaHouseDamage size={25} className="m-2" />
        <input
          type="text"
          placeholder="Property Size"
          className="w-full text-sm focus:outline-none"
        />
      </div>
      <div className="flex flex-1 flex-row items-center bg-white p-2">
        <GiHouseKeys size={25} className="m-2" />
        <input
          type="text"
          placeholder="Property Type : '3bhk, 2bhk etc...'"
          className="line-clamp-6 w-full text-sm focus:outline-none"
        />
      </div>
    </form>
  );
};

export default SearchBar;
