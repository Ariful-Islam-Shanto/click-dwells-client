import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../../Components/Container/Container';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();

    const {data : allProperties, isLoading} = useQuery({
        queryKey : ['verifiedProperty'],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/properties?status=verified`);
            return data;
        }
    })

    console.log(allProperties);
    return (
        <div className=''>

            <Container>
            <Navbar></Navbar>
            <h1 className="text-4xl mb-8 border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
            Find your next place to live
        </h1>  
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
                {
                    allProperties?.map(property => 
                        <div key={property._id} className="card card-compact h-full bg-base-100 shadow-xl">
                        <figure><img src={property?.image} alt="Property" className='h-[200px] object-cover rounded-md'/></figure>
                        <div className="card-body">
                            <div className='flex items-center justify-between'>

                            <div>
                          <h2 className="card-title">{property?.title} </h2>
                          <p>{property?.location}</p>
                          <p>{property?.price_range}</p>
                          </div>
                          <div>
                           
                          <div className="badge bg-blue-200 text-black">{property?.status}</div>
                            </div>
                          </div>
                          <div className="card-actions justify-between">
                            <div className='flex items-center gap-2'>
                                <img src={property?.agent?.image} alt="Agent" className='w-10 h-10 rounded-full'/>
                                <h1 className='text-sm text-white font-semibold'></h1>
                            </div>
                            <Link to={`/property/details/${property?._id}`}>
                            <button className="btn btn-primary">Details</button>
                            </Link>
                          </div>
                        </div>
                      </div>   
                        )
                }
            </div>
            </Container>
        </div>
    );
};

export default AllProperties;