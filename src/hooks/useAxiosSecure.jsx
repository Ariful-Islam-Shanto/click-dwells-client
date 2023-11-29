import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})

const useAxiosSecure = () => {

//     const {logOut} = useAuth();
//     const navigate = useNavigate();

//     //? Add a response interceptor
//      instance.interceptors.response.use(function (response) {

//     return response;
//   }, function (error) {
//      const status = error.response.status;
//     //  console.log("interceptor", status);
//      //* For 401 or 403 logout the user.
//      if(status === 401 || status === 403) {
//         logOut();
//         navigate('/login');
//      }
//     return Promise.reject(error);
//   });
    return instance
};

export default useAxiosSecure;