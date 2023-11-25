import axios from 'axios';

//*  This'll be using for public api that doesn't need to secure.

const instance = axios.create({
    baseURL : import.meta.env.VITE_API_URL
})

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;