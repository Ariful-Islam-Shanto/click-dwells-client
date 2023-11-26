import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../Components/Container/Container';
import Navbar from '../../Components/Navbar/Navbar';
import { MdOutlineLocationOn } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Details = () => {

    const {data = {}} = useLoaderData();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();


    const handleAddToWishList = async () => {
        const property = {
            user : {
                name : user?.displayName,
                email : user?.email,
                image : user?.photoURL
            },
            title : data?.title,
            image : data?.image,
            location : data?.location,
            description : data?.description,
            price_range : data?.price_range,
            status : 'pending',
            agent : {
                name : data?.agent?.name,
                email : data?.agent?.email,
                image : data?.agent?.image
            }

        }

        console.log(property);

       try {
        const { data } = await axiosSecure.post('/wishlist', property);

        console.log(data);
        if(data.insertedId) {
            toast.success('Added to wishlist');
        }
       } catch (error) {
        console.log(error);
        toast.error(error.message);
       }

    }

    const {mutate} = useMutation({
        mutationFn : handleAddToWishList,
        mutationKey : ['wishlist'],
    })
    
   
    return (
        <div className='min-h-screen'>
            <Container>
                <Navbar/>
                <div className='h-[400px] flex gap-2 '>
                    <div className='flex-1 w-full h-full'>
                    <img src={data.image} alt="" className='h-full w-full object-cover rounded-md'/>
                    </div>
                    <div className='h-full w-72 bg-[#142c3d] rounded-md p-4 flex flex-col justify-between'>
                        <h1 className='text-2xl font-bold text-white'>{data?.price_range}</h1>
                        <h1 className='text-xl text-white font-semibold'>{data?.title}</h1>
                        <p className='flex items-center text-gray-300'><MdOutlineLocationOn/>{data?.location}</p>
                        <p className='font-thin text-gray-300'>{data?.description}</p>
                        <hr />
                        <div className='flex items-center justify-between'>
                            <div className='w-10 h-10'>
                                <img src={data?.agent?.image} alt="" className='w-full h-full object-cover rounded-full'/>
                            </div>
                            <h3 className='text-sm text-semibold text-gray-200'>{data?.agent?.name}</h3>
                        </div>
                        <hr />
                        <div className='w-full'>
                            <button onClick={mutate} className='px-8 py-2 text-medium text-gray-100 border-none rounded-md w-full bg-[#0271f8]'>Add to WishList</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Details;