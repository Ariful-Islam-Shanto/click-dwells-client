import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageProperties = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : allProperties , isLoading, refetch } = useQuery({
        enabled : !loading && !!user,
        queryKey : ['allProperty'],
        queryFn : async () => {
            const { data } = await axiosSecure.get(`/allProperties/${user?.email}`);
            return data;
        }
    })

    console.log(allProperties);


    const { mutate } = useMutation({
        mutationKey : ['updatePropertyStatus'],
        mutationFn : async (accepted) => {
            const { data } = await axiosSecure.patch(`/updatePropertyStatus/${accepted.id}?status=${accepted.status}`);
            console.log(data);
        },
        onSuccess : () => {
            toast.success('Successfully updated the status.')
            refetch();
        } 
      })
    
      const handleUpdateStatus = (status, id) => {
        console.log(status, id);
        mutate({status, id})
      }
    return (
        <div className="space-y-4 py-8 ">
      <h1 className="text-4xl text-center text-black font-bold">
        Manage Properties
      </h1>
      <div className="overflow-x-scroll w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Buyer</th>
              <th>Price Range</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allProperties?.map((property) => (
              <tr key={property._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={property?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{property?.title}</div>
                      <div className="text-sm opacity-50">
                        {property?.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={property?.agent?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{property?.agent?.name}</div>
                      <div className="text-sm opacity-50">{property?.agent?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {property?.price_range}
                  <br />
                </td>
                <th className=''>
                 {property?.status === 'pending' && <>
                 <button onClick={() => handleUpdateStatus('verified', property?._id)} className="btn ml-3 bg-[#377e65] btn-xs">Verify</button>
                  <button onClick={() => handleUpdateStatus('rejected', property?._id)} className="btn bg-[#d45a5a] btn-xs">Reject</button>
                 </>}

                 {property?.status === 'verified' &&   <p className=" text-[#377e65]">Verified</p>}

                 {property?.status === 'bought' &&   <p className=" text-[#377e65]">Bought</p>}

                 {property?.status === 'rejected' &&   <p className=" text-[#d45a5a]">Rejected</p>}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageProperties;