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
import PropertyBought from '../Pages/Dashboard/User/PropertyBought/PropertyBought';
import PaymentForm from '../Pages/Dashboard/User/PropertyBought/Payment/PaymentForm';
import MySoldProperties from '../Pages/Dashboard/Agent/MySoldProperties';
import UpdateProperty from '../Pages/Dashboard/Agent/UpdateProperty';
import AdminProfile from '../Pages/Dashboard/Admin/AdminProfile';
import ManageProperties from '../Pages/Dashboard/Admin/ManageProperties';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import MyReviews from '../Pages/Dashboard/User/MyReviews/MyReviews';
import ManageReviews from '../Pages/Dashboard/Admin/ManageReviews';



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
                path : 'property-bought',
                element : <PropertyBought/>
            },
            {
                path : "make-an-offer/:id",
                element : <MakeAnOfferForm/>,
                loader : async ({params}) => await axiosSecure.get(`/wishlist/${params.id}`)
            },
            {
                path : "payment/:id",
                element : <PaymentForm/>,
                loader : async ({params}) => await axiosSecure.get(`/propertyBought/${params.id}`)
            },
            {
                path : "my-reviews",
                element : <MyReviews/>
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
            },
            {
                path : "sold-properties",
                element : <MySoldProperties/>
            },
            {
                path : "update/:id",
                element : <UpdateProperty/>,
                loader : async ({params}) => await axiosSecure.get(`/property/${params.id}`)
            },
            //? Admin only routes
            {
                path : 'admin-profile',
                element : <AdminProfile/>
            },
            {
                path : 'manage-properties',
                element : <ManageProperties/>
            },
            {
                path : 'manage-users',
                element : <ManageUsers/>
            },
            {
                path : 'manage-reviews',
                element : <ManageReviews/>
            }
        ]
    }
])

export default routes;