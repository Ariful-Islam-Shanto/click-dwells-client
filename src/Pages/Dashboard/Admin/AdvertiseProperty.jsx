import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const AdvertiseProperty = () => {

    const axiosSecure = useAxiosSecure();

    const {data : allProperties, isLoading, refetch} = useQuery({
        queryKey : ['verifiedProperty'],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/properties?status=verified`);
            return data;
        }
    })


    const {mutate} = useMutation({
        mutationKey : ['updateAdvertise'],
        mutationFn : async (advertise) => {
            const { data } = await axiosSecure.patch('/updateAdvertise', advertise);
            console.log(data);
            if(data.modifiedCount > 0) {
                toast.success('Successfully advertised the property');
                console.log(data);
                refetch()
            }else{
                toast.error("Limit exceeded. Can't add more than 6")
            }
        }
    })

    const handleUpdateStatus = (isAdvertise, id) => {
        console.log(isAdvertise, id);
        mutate({isAdvertise, id})
    }
    return (
        <div className="space-y-4 py-8 ">
              <Helmet>
                <title>CD Dashboard | Advertise Property</title>
            </Helmet>
        <h1 className="text-4xl text-center text-black font-bold">
         Advertise Property
        </h1>
        <div className="overflow-x-scroll w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Property</th>
                <th>Agent</th>
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
                   {/* {property?.advertise === false && <> */}
                   <button disabled={property?.advertise === true} onClick={() => handleUpdateStatus(true, property?._id)} className="btn ml-3 bg-[#377e65] btn-xs">Advertise</button>
                    <button disabled={property?.advertise === false} onClick={() => handleUpdateStatus(false, property?._id)} className="btn bg-[#d45a5a] btn-xs">Remove</button>
                   {/* </>} */}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AdvertiseProperty;