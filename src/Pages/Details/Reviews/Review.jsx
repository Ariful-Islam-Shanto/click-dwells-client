import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Review = ({ propertyInfo }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!propertyInfo,
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/reviews?id=${propertyInfo?._id}`
      );
      return data;
    },
  });

  console.log(reviews);

  const { mutate } = useMutation({
    mutationKey: ["addReview"],
    mutationFn: async (review) => {
      const { data } = await axiosSecure.post("/reviews", review);
      if (data.insertedId) {
        toast.success("Successfully added a review.");
        console.log(data);
        refetch();
      }
    },
  });

  const handleReview = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const review = form.get("review");

    if (!review) {
      toast.error("Please write something to add review");
    }

    const reviewInfo = {
      title: propertyInfo.title,
      reviewPropertyId: propertyInfo._id,
      agent: {
        name: propertyInfo?.agent?.name,
        email: propertyInfo?.agent?.email,
        image: propertyInfo?.agent?.image,
      },
      time: new Date(),
      description: review,
      reviewer: {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      },
    };

    console.log(reviewInfo);
    mutate(reviewInfo);
    e.target.reset();
  };

  return (
    <div className="px-6 md:px-0 pb-6 py-14 space-y-12">
      <h1 className="text-4xl text-center text-black font-bold">
        All the reviews made by our beloved.
      </h1>
      <div className="flex flex-col md:flex-row md:h-[400px] gap-4">
        <div className="flex-1">
          <img
            src="https://i.ibb.co/0QXwkNM/5374793.jpg"
            alt=""
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 flex gap-4 flex-col items-center justify-between">
          <h1 className="text-white text-2xl">All Reviews</h1>
          {reviews.length < 1 ? (
            <>NO REVIEWS on this property</>
          ) : (
            <div className="overflow-auto flex flex-col gap-4">
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className="card bg-gray-50 shadow-xl flex items-center flex-row h-[100px] py-4 px-6 gap-3 justify-center"
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex ">
                      <img src={review?.reviewer?.image} />
                    </div>
                  </div>
                  <div className="">
                    <h2 className="font-bold text-black ">{review?.reviewer?.name}</h2>
                    <p className="text-neutral-600 font-thin">{review?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            disabled={!user || !propertyInfo}
            className="text-sm font-medium border-none px-7 py-2 w-full rounded-lg text-white bg-blue-600"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add a review
          </button>
          <dialog
            id="my_modal_5"
            className="modal  modal-bottom sm:modal-middle"
          >
            <div className="modal-box bg-white ">
              <h3 className="font-bold text-black mb-4 text-xl">
                Add a review
              </h3>
              <form onSubmit={handleReview}>
                <textarea
                  placeholder="write here"
                  name="review"
                  id=""
                  cols="30"
                  rows="10"
                  className="input input-bordered input-info w-full h-[100px] bg-blue-50 p-5"
                ></textarea>

                <div className="modal-action flex justify-between">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-warning">Close</button>
                  </form>
                  <div>
                    <button
                      type="submit"
                      className="btn bg-blue-400 text-black hover:text-white border-none"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Review;
