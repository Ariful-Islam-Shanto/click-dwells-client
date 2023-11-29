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
import AdvertiseProperty from '../Pages/Dashboard/Admin/AdvertiseProperty';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import AgentRoute from './AgentRoute/AgentRoute';
import AdminRoute from './AdminRoute/AdminRoute';



const axiosSecure = useAxiosSecure();

const routes = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        errorElement : <ErrorPage/>,
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
                element : <PrivateRoute><AllProperties/></PrivateRoute>
            },
            {
                path : "/property/details/:id",
                element : <PrivateRoute><Details/></PrivateRoute>,
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
                element : <PrivateRoute><UserProfile/></PrivateRoute>
            },
            {
                path : 'wishlist',
                element : <PrivateRoute> <MyWishlist/></PrivateRoute>
            },
            {
                path : 'property-bought',
                element : <PrivateRoute><PropertyBought/></PrivateRoute>
            },
            {
                path : "make-an-offer/:id",
                element : <PrivateRoute><MakeAnOfferForm/></PrivateRoute>,
                loader : async ({params}) => await axiosSecure.get(`/wishlist/${params.id}`)
            },
            {
                path : "payment/:id",
                element : <PrivateRoute><PaymentForm/></PrivateRoute>,
                loader : async ({params}) => await axiosSecure.get(`/propertyBought/${params.id}`)
            },
            {
                path : "my-reviews",
                element : <PrivateRoute><MyReviews/></PrivateRoute>
            },
            //? Agent only routes
            {
                path : 'agent-profile',
                element : <AgentRoute><AgentProfile/></AgentRoute>
            },
            {
                path : 'add-property',
                element : <AgentRoute><AddProperty/></AgentRoute>
            },
            {
                path : 'my-added-properties',
                element : <AgentRoute><MyAddedProperties/></AgentRoute>
            },
            {
                path : 'offered-properties',
                element : <AgentRoute><OfferedProperty/></AgentRoute>
            },
            {
                path : "sold-properties",
                element : <AgentRoute><MySoldProperties/></AgentRoute>
            },
            {
                path : "update/:id",
                element : <AgentRoute><UpdateProperty/></AgentRoute>,
                loader : async ({params}) => await axiosSecure.get(`/property/${params.id}`)
            },
            //? Admin only routes
            {
                path : 'admin-profile',
                element :  <AdminRoute><AdminProfile/></AdminRoute>
            },
            {
                path : 'manage-properties',
                element : <AdminRoute><ManageProperties/></AdminRoute>
            },
            {
                path : 'manage-users',
                element : <AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path : 'manage-reviews',
                element : <AdminRoute><ManageReviews/></AdminRoute>
            },
            {
                path : 'advertise-property',
                element : <AdminRoute><AdvertiseProperty/></AdminRoute>
            }
        ]
    }
])

export default routes;