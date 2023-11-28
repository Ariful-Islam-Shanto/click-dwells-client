import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
         <li className="text-center">
            <NavLink
              to="user-profile"
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
              Wishlist
            </NavLink>
            </li>
            <li>
            <NavLink
              to="property-bought"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              Property Bought
            </NavLink>
            </li>
            <li>
            <NavLink
              to="my-reviews"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D1F366] text-black" : " "
              }
            >
              My Reviews
            </NavLink>
            </li>
        </>
    );
};

export default UserMenu;