import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const OfferedProperty = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  

  const { data: offeredProperty = [], isLoading, refetch : refetchAllOffer } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["allOfferedProperty"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offeredProperty?email=${user?.email}`);
      return data;
    },
  });

  
  const {mutate} = useMutation({
    mutationKey : ['updateStatus'],
    mutationFn : async (accepted) => {
        const { data } = await axiosSecure.put(`/updateOfferedStatus/${accepted.id}?status=${accepted.status}`);
        console.log(data);
    },
    onSuccess : () => {
        toast.success('Successfully updated the status.')
        refetchAllOffer();
    } 
  })

  const handleUpdateStatus = (status, id) => {
    console.log(status, id);
    mutate({status, id})
  }
  console.log(offeredProperty);
  return (
    <div className="space-y-4 py-8 ">
      <h1 className="text-4xl border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
         Offered Properties
        </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Buyer</th>
              <th>Offered Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {offeredProperty?.map((property) => (
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
                          src={property?.buyer?.image || user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{property?.buyer?.name}</div>
                      <div className="text-sm opacity-50">{property?.buyer?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {property?.offeredAmount}
                  <br />
                </td>
                <th>
                 {property?.status === 'pending' && <>
                 <button onClick={() => handleUpdateStatus('accepted', property?._id)} className="btn ml-3 bg-[#377e65] btn-xs">Accept</button>
                  <button onClick={() => handleUpdateStatus('rejected', property?._id)} className="btn bg-[#d45a5a] btn-xs">Reject</button>
                 </>}

                 {property?.status === 'accepted' &&   <p className=" text-[#377e65]">Accepted</p>}

                 {property?.status === 'rejected' &&   <p className=" text-[#d45a5a]">Rejected</p>}

                 {property?.status === 'bought' &&   <p className=" text-blue-400">Sold</p>}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferedProperty;
