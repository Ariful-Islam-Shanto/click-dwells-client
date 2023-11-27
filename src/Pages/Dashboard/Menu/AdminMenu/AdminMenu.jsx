import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
          <li>
          <NavLink
              to="admin-profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Profile
            </NavLink> 
            </li>  
          <li>
          <NavLink
              to="manage-properties"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
             Manage Properties
            </NavLink> 
            </li>  
        </>
    );
};

export default AdminMenu;