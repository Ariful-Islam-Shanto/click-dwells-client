import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import AddProperty from '../Pages/Dashboard/Agent/AddProperty';
import AgentProfile from '../Pages/Dashboard/Agent/AgentProfile';
import UserProfile from '../Pages/Dashboard/User/UserProfile';
import MyAddedProperties from '../Pages/Dashboard/Agent/MyAddedProperties';
import AllProperties from '../Pages/All Properties/AllProperties';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Details from '../Pages/Details/Details';
import MyWishlist from '../Pages/Dashboard/User/MyWishlist/MyWishlist';
import MakeAnOfferForm from '../Pages/Dashboard/User/MyWishlist/MakeAnOfferForm';
import OfferedProperty from '../Pages/Dashboard/Agent/OfferedProperty';

const axiosSecure = useAxiosSecure();

const routes = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : "/",
                element : <Home></Home>
            },
            {
                path : "/login",
                element : <Login></Login>
            },
            {
                path : "/register",
                element : <Register></Register>
            },
            {
                path : "/allProperties",
                element : <AllProperties/>
            },
            {
                path : "/property/details/:id",
                element : <Details/>,
                loader : async ({params}) => await axiosSecure.get(`/property/${params.id}`)
            },
        ]
    },
    {
        path : 'dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            //? User only routes
            {
                path : 'user-profile',
                element : <UserProfile/>
            },
            {
                path : 'wishlist',
                element : <MyWishlist/>
            },
            {
                path : "make-an-offer/:id",
                element : <MakeAnOfferForm/>,
                loader : async ({params}) => await axiosSecure.get(`/wishlist/${params.id}`)
            },
            //? Agent only routes
            {
                path : 'agent-profile',
                element : <AgentProfile/>
            },
            {
                path : 'add-property',
                element : <AddProperty/>
            },
            {
                path : 'my-added-properties',
                element : <MyAddedProperties/>
            },
            {
                path : 'offered-properties',
                element : <OfferedProperty/>
            }
        ]
    }
])

export default routes;