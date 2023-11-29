import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Advertisement = () => {
const {user} = useAuth();
const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    data: advertiseProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedProperty"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/advertisedProperties?advertise=${true}`
      );
      return data;
    },
  });

  console.log(advertiseProperties);
  return (
    <Container>
      <div className="space-y-8 py-20 px-5 md:px-0">
        <div className="space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="169"
            height="4"
            viewBox="0 0 169 4"
            fill="none"
          >
            <rect
              width="169"
              height="4"
              rx="2"
              fill="url(#paint0_linear_0_193)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_193"
                x1="0"
                y1="5.89929"
                x2="160.49"
                y2="5.89929"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FFAC12" />
                <stop offset="1" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="text-4xl font-semibold text-black ">
            Your Dream Home Awaits: Explore and Buy Properties Today!
          </h1>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 ">
            {
                advertiseProperties?.map(property => 
                    <div key={property._id} className="card bg-base-100 w-full h-full flex flex-col justify-between shadow-xl">
                    <figure><img src={property?.image} alt="Prop" className="w-full h-[250px] object-cover"/></figure>
                    <div className="card-body flex flex-col justify-between flex-grow">
                      <h2 className="card-title flex-grow">
                         {property?.title}
                        <div className="badge badge-ghost flex-grow">{property?.status}</div>
                      </h2>
                      <div className=" w-full">
                      
                            <button onClick={() => {
                                if(!user) {
                                 toast.error('Please login to see details');
                                  return navigate('/')
                                }else{
                                    navigate(`/property/details/${property?._id}`)
                                }

                            }} className="px-6 py-2 text-white rounded-md border-none bg-[#ff735c] w-full">Details</button>
                         
                      </div>
                    </div>
                  </div>   
                    
                    )
            }
         </div>
      </div>
    </Container>
  );
};

export default Advertisement;
