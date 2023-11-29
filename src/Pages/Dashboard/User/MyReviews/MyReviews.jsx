import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyReviews = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["myReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/myReviews?email=${user?.email}`);
      return data;
    },
  });


  const { mutate } = useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/reviews/${id}`);
      if (data.deletedCount > 0 ) {
        toast.success("Successfully deleted review.");
        console.log(data);
        refetch();
      }
    },
  });

  return (
    <div className="px-6 py-12 space-y-8">
        <Helmet>
                <title>CD Dashboard | My Reviews</title>
            </Helmet>
        <h1 className="text-4xl border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
         My Reviews
        </h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews?.map((review) => (
    

        <div
          key={review?._id}
          className="card drop-shadow-md bg-white text-black"
        >
          <div className="card-body items-left text-left">
            <h2 className="card-title "> {review?.title}</h2>
            <h2 className="font-medium"> Agent : {review?.agent?.name}</h2>
            <h2 className="">{review?.time}</h2>
            <p>{review?.description}</p>
            <div className="card-actions justify-start">
              <button onClick={() => mutate(review?._id)} className="btn bg-blue-400 text-gray-800">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyReviews;
