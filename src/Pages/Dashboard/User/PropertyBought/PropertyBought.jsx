import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const PropertyBought = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: propertyBought = [], isLoading, refetch : refetchAllOffer } = useQuery({
        enabled: !loading && !!user,
        queryKey: ["propertyBought"],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/propertyBought?email=${user?.email}`);
          return data;
        },
      });

      console.log(propertyBought);
    return (
        <div className="px-6 space-y-6 py-8">
        <h1 className="text-4xl border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
         Property Bought
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {propertyBought?.map((property) => (
            <div key={property._id} className="card flex flex-row h-full bg-[#131b2d] shadow-xl px-4">
              <figure>
                <img
                  src={property?.image}
                  alt="Property"
                  className="w-[300px] h-[200px] rounded-md object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white">
                  {property?.title}
                  <div className="badge text-gray-800 bg-blue-200"> {property?.status}</div>
                </h2>
                <p className='text-neutral-200'>{property?.location}</p>
                <p className='text-neutral-200'>{property?.offeredAmount}</p>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full">
                      <img src={property?.agent?.image || user?.photoURL} alt=""  className="h-full w-full object-cover rounded-full"/>
                  </div>
                  <div>
                      <h1 className="text-sm text-white font-medium">{property?.agent?.name}</h1>
                  </div>
                </div>
                <div className="card-actions flex-col justify-between pt-2">
                   <button disabled={property?.status === 'pending' || property?.status === 'bought'} onClick={() => {
                      navigate(`/dashboard/payment/${property._id}`)
                   }} className={`px-5 py-1 rounded-md  ${property?.status === 'pending' ? 'bg-[#57524b]' : 'bg-[#ffbb55]'} hover:bg-[#c28223] font-semibold hover:text-white  border-none w-full text-black`}>Pay</button>

                </div>
  
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PropertyBought;