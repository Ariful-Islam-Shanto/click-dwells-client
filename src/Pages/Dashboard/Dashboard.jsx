import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import UserMenu from "./Menu/UserMenu/UserMenu";
import AgentMenu from "./Menu/AgentMenu/AgentMenu";
import AdminMenu from "./Menu/AdminMenu/AdminMenu";

const Dashboard = () => {

  const [role, isLoading] = useRole();
  console.log(role);
  
  return (
    <div className=" min-h-screen flex">
      <div className="w-64 menu">
        <ul className="menu text-center  p-4">
         {/* User menu */}
         {!isLoading && role === 'guest' && <UserMenu/>}
            {/* Agent menu */}
         {!isLoading && role === 'agent' && <AgentMenu/>}
            {/* Admin menu */}
         {!isLoading && role === 'admin' && <AdminMenu/>}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
