import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OfferedProperty = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offeredProperty = [], isLoading } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["allOfferedProperty"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/offeredProperty");
      return data;
    },
  });

  console.log(offeredProperty);
  return (
    <div className="space-y-4 py-8 ">
      <h1 className="text-4xl text-center text-white font-bold">
        My Added Properties
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
                  <button className="btn ml-3 bg-[#377e65] btn-xs">Accept</button>
                  <button className="btn bg-[#d45a5a] btn-xs">Reject</button>
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
