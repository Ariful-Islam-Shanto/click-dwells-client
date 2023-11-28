import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !loading && !!user,
    queryKey: ["allReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allReviews`);
      console.log(data);
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
    <div className="py-12 space-y-8">
        <h1 className="text-4xl border-l-4 pl-4 border-[#c28223] text-left text-black font-bold">
         My Reviews
        </h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      { reviews.length > 0 && reviews?.map((review) => (
    

        <div
          key={review?._id}
          className="card drop-shadow-md bg-white text-black"
        >
          <div className="card-body items-left text-left">
            <div className="flex items-center justify-between">
                <img src={review?.reviewer?.image} alt="" className="w-10 h-10 rounded-full"/>

                <div>
                    <h1>Reviewer : {review?.reviewer?.name}</h1>
                    <h1>Email : {review?.reviewer?.email}</h1>
                </div>
            </div>
            <p>{review?.description}</p>
            <div className="card-actions justify-start">
              <button onClick={() => mutate(review?._id)} className="btn bg-[#c28223] text-white">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ManageReviews;
