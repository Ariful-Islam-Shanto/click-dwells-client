import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MySoldProperties = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = {}, isLoading } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["soldProperties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/soldProperties?email=${user?.email}`
      );
      return data;
    },
  });

  console.log(soldProperties);
  return (
    <div className="space-y-4 py-8 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl text-left text-black font-bold">
          My Sold Properties
        </h1>
        {/* stat */}
        <div className="stats shadow bg-blue-800/60 text-white">
          <div className="stat">
            <div className="stat-title text-white">Total Revenue</div>
            <div className="stat-value text-white">{soldProperties?.revenue}</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Buyer</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {soldProperties?.result?.map((property) => (
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
                          src={property?.buyer?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{property?.buyer?.name}</div>
                      <div className="text-sm opacity-50">
                        {property?.buyer?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {property?.totalAmount}
                  <br />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
