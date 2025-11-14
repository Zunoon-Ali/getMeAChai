import React from "react";
import "./Navbar.css";

const navbar = () => {
  return (
    <nav className="bg-blue-950 text-white p-6 flex items-center justify-between w-full">
      <div className="flex items-center pl-2">
        <h1 className="text-2xl font-extrabold flex items-center justify-center">
          GetMeAChai
        </h1>

        <span className="">
          <img
            src="/chai.gif"
            alt="chai"
            className="w-14 h-14 relative -top-1 ml-1"
          />
        </span>
      </div>
      <div className="menuLinks">
        <ul className="flex items-center justify-center gap-6">
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="action">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-6 py-2.5 text-center leading-5 rounded-xl">Login</button>
          </li>
          <li>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-6 py-2.5 text-center leading-5 rounded-xl">Register</button>
          </li>
          <li>
           <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-6 py-2.5 text-center leading-5 rounded-xl">Cart</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
