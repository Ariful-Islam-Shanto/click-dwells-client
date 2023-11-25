import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" min-h-screen flex">
      <div className="w-64 menu">
        <ul className="menu text-center  p-4">
          <li className="text-center">
            <NavLink
              to="my-profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Profile
            </NavLink>
            </li>
            <li>
            <NavLink
              to="wishlist"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Profile
            </NavLink>
            </li>
            {/* Agent menu */}
            <li>
            <NavLink
              to="add-property"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              Add Property
            </NavLink>
            </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
