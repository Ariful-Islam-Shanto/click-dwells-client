import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const MyWishlist = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data : wishlist = [], isLoading, refetch} = useQuery({
        enabled : !loading && !!user,
        queryKey : ['wishlists'],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return data;
        }
    })

    //? Delete property.
    const {mutate} = useMutation({
      mutationKey : ['deleteWishlist'],
      mutationFn : async (id) => {
        const {data} = await axiosSecure.delete(`/deleteWishlist/${id}`)
        if(data.deletedCount > 0) {
          toast.success('Successfully deleted.')
          console.log(data);
          refetch();
        }
      }
    })

    console.log(wishlist);
    return (
        <div className=" px-6 space-y-6 py-8">
          <Helmet>
                <title>CD Dashboard | My Wishlist</title>
            </Helmet>
      <h1 className="text-4xl border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {wishlist?.map((property) => (
          <div key={property._id} className="card h-full bg-[#131b2d] shadow-xl">
            <figure>
              <img
                src={property?.image}
                alt="Property"
                className="w-full h-[200px] object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-white">
                {property?.title}
                <div className="badge text-gray-800 bg-blue-200"> {property?.status}</div>
              </h2>
              <p>{property?.location}</p>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full">
                    <img src={property?.agent?.image || user?.photoURL} alt=""  className="h-full w-full object-cover rounded-full"/>
                </div>
                <div>
                    <h1 className="text-sm text-white font-medium">{property?.agent?.name}</h1>
                </div>
              </div>
              <div className="card-actions flex-col justify-between pt-2">
                 <button disabled={property?.status === 'bought'} onClick={() => {
                    navigate(`/dashboard/make-an-offer/${property?._id}`)
                 }} className="px-5 py-1 rounded-md bg-[#ffbb55] hover:bg-[#c28223] font-semibold hover:text-white  border-none w-full text-black">Make an offer</button>
                 <button onClick={() => mutate(property?._id)} className="px-8 py-1 rounded-md bg-gray-800 border-2 border-black w-full hover:border-[#c28223] hover:bg-gray-800 font-semibold hover:text-white text-gray-300 ">Delete</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default MyWishlist;