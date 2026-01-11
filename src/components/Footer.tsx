import React from "react";
import coffee from "../assets/images/coffee.png";
import { BiCoffeeTogo } from "react-icons/bi";
import { URLS } from "../data";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-2">
      <div className="bg-gray-700 text-white p-4 mb-4 rounded-xl flex justify-center items-center align-middle text-lg space-x-4 flex-grow">
        <img src={coffee} alt="coffee" className="w-10 h-10" />
        <div className="">
          <span className="font-bold">Enjoying our Product?</span>
          <span> Share some support</span>
        </div>
        <button
          className="bg-blue-500 px-7 py-1 rounded-lg font-bold flex justify-center items-center hover:bg-blue-400"
          onClick={() => window.open(URLS.DONATE, "_blank")}
        >
          <BiCoffeeTogo className="w-8 h-8 flex" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
