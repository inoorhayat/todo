import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-4 bg-cream">
      <div className="logo">
        <span className="text-hot-pink text-4xl font-bold mx-10 ">Todoooo</span>
      </div>
      <ul className="flex gap-8 mx-9 text-hot-pink">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
