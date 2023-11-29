import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../Components/Container/Container";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTitle, setSearchTitle] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { data: allProperties, isLoading, refetch } = useQuery({
    queryKey: ["verifiedProperty", sortBy],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties?status=verified&&title=${searchTitle}&sortBy=${sortBy}`);
      return data;
    },
  });

  

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchTitle(event.target.value);

  };
  console.log(allProperties);

  const handleOnSubmit = () => {
    console.log(searchTitle);
    refetch();
  }

  //? Handle Sort
    const handleSortChange = (event) => {
        event.preventDefault();
        setSortBy(event.target.value);
        console.log(sortBy);
    };
 


  return (
    <div className="px-6 md:px-0">
         <Helmet>
                <title>Click Dwells | All Properties</title>
            </Helmet>
      <Container>
        <Navbar></Navbar>
        <h1 className="text-4xl mb-8 border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
          Find your next place to live
        </h1>

        <div className="flex w-full items-center justify-between">
        <div className="flex items-center ">
          <input
            type="text"
            placeholder="Search by title"
            className="input input-bordered w-full max-w-xs"
            value={searchTitle}
            onChange={handleSearchChange}
          />
            <button
        className="btn btn-primary ml-2"
        onClick={handleOnSubmit}
      >Search</button>
        </div>
        <select
          className="select select-bordered ml-2"
          onChange={handleSortChange}
          defaultValue={'default'}
        >

          <option value="default">Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 py-8">
          {allProperties?.map((property) => (
            <div
              key={property._id}
              className="card card-compact h-full bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={property?.image}
                  alt="Property"
                  className="h-[200px] object-cover rounded-md w-full"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title">{property?.title} </h2>
                    <p>{property?.location}</p>
                    <p>{property?.price_range}</p>
                  </div>
                  <div>
                    <div className="badge bg-blue-200 text-black">
                      {property?.status}
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={property?.agent?.image}
                      alt="Agent"
                      className="w-10 h-10 rounded-full"
                    />
                    <h1 className="text-sm text-gray-700 font-semibold">
                      {property?.agent?.name}
                    </h1>
                  </div>
                  <Link to={`/property/details/${property?._id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllProperties;
