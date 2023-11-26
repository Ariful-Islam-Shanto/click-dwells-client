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
            }
        ]
    }
])

export default routes;