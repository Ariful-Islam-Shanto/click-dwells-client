import React from 'react';
import { NavLink } from 'react-router-dom';

const AgentMenu = () => {
    return (
        <>
         <li>
            <NavLink
              to="agent-profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Profile
            </NavLink>
            </li>
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
            <li>
            <NavLink
              to="my-added-properties"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Added Properties
            </NavLink>
            </li>
            <li>
            <NavLink
              to="my-sold-properties"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Sold Properties
            </NavLink>
            </li>
            <li>
            <NavLink
              to="offered-properties"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              Offered Properties
            </NavLink>
            </li>
        </>
    );
};

export default AgentMenu;