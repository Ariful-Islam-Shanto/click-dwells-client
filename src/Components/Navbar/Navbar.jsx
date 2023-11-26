import React, { useState } from "react";
import Button from "../Button/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import logo from "../../../public/Animation - 1700875593059.json";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role, isLoading] = useRole();
  const [showProfile, isShowProfile] = useState(false);
  const navigate = useNavigate();

  const navLinks = (
    <>
      <NavLink
       to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
        }
      > 
        Home
      </NavLink>
{ user &&      <NavLink
       to="/allProperties"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
        }
      > 
        All Properties
      </NavLink>}
      {user && role && (
        <>
          {role === "guest" ? (
            <NavLink
              to="/dashboard/user-profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard/agent-profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-[#FFAC12]" : ""
              }
            >
              Dashboard
            </NavLink>
          )}
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    logOut();
    toast.success("Successfully logged out.");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar bg-transparent p-8">
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
            <Lottie animationData={logo}></Lottie>
          </div>
          <a className="text-xl font-bold tex-white">ClickDwells</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-12">{navLinks}</ul>
        </div>

        {/* //? User Profile */}
        {user ? (
          <div
            onClick={() => isShowProfile(!showProfile)}
            className="relative navbar-end"
          >
            <label className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </label>

            {showProfile && (
              <ul className="menu absolute top-12 menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between ">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li className="active:bg-[#c1700d] focus:bg-[#fd9414]">
                  <a>{user?.displayName}</a>
                </li>
                <li className="active:bg-[#d27a10] focus:bg-[#fd9414]">
                  <a>{user?.email}</a>
                </li>
                <li
                  onClick={handleSignOut}
                  className="active:bg-[#bf700f] focus:bg-[#fd9414]"
                >
                  <a>Logout</a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="navbar-end">
            <Link to={"/login"}>
              <Button text="Login" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
