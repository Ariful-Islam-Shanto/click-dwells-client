import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
// import { Rating } from '@smastrom/react-rating';
// import '@smastrom/react-rating/style.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../Components/Container/Container";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/getLatestReviews`);
      return data;
    },
  });

  return (
    <div className="py-12">
      <Container>
        <div className="space-y-8">
        <div className="space-y-2 flex flex-col items-center justify-center">
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
        
          <h1 className="text-4xl text-black font-bold">
            What our client says
          </h1>
        </div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review._id} className="">
              <div className=" mx-24 text-center flex items-center justify-center flex-col space-y-8 py-24">
                {/* <Rating
      style={{ maxWidth: 180 }}
      value={3}
      readOnly

    /> */}
              <h1 className="text-2xl text-black text-center font-bold">{review?.title}</h1>
                <p>{review?.description}</p>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={review?.reviewer?.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <h1 className="text-xl text-black">
                    {review?.reviewer?.name}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;
