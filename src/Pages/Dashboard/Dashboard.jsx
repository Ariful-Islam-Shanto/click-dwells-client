import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 menu">
        <ul className="menu p-4">
          <li>
            <NavLink
              to="userHome"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " " : ""
              }
            >
              User Home
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
