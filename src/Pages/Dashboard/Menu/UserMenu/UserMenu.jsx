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
        </>
    );
};

export default UserMenu;