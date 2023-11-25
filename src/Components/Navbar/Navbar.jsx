import React from "react";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import logo from '../../../public/Animation - 1700875593059.json';

const Navbar = () => {

    const navLinks = <>
    
<NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
  }
>
  Home
</NavLink>
<NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
  }
>
  Home
</NavLink>
    </>
  return (
    <div>
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex gap-12"
            >
            {navLinks}
            </ul>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
          <Lottie animationData={logo} ></Lottie>
          </div>
          <a className="text-xl font-bold text-white">ClickDwells</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-12">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <Button text='Login'/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
