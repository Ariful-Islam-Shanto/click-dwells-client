import React from "react";


const Banner = () => {
  return (
    <div className=" md:pt-6 md:pb-12 lg:pt-6 lg:pb-12 xl:pt-6 xl:pb-12 md:h-[400px] lg:h-[500px] xl:h-[570px] flex items-center flex-col-reverse md:flex-row lg:flex-row xl:flex-row gap-4 justify-center">
      <div className="py-8 md:py-0 lg:py-0 xl:py-0 flex-1 flex flex-col items-center md:items-start lg:items-start xl:items-start space-y-6">
        <h1 className="text-4xl text-center md:text-left lg:text-left xl:text-left  md:text-4xl lg:text-6xl xl:text-6xl text-black font-bold -tracking-tight">
          Beautiful 
          homes made 
          for you
        </h1>
        <p className="text-xs text-center md:text-left lg:text-left xl:text-left md:text-sm font-thin text-gray-700">
          At ClickDwells, embark on a journey where every click is a step closer
         to unlocking the door to your dream home.
           {/*  Our curated collection of
          properties invites you to explore a world of possibilities, where each
          dwelling has a unique story to tell. Find not just a house, but a
          place where your aspirations come to life. */}
        </p>
        <button className="px-8 py-2 border-none bg-[#ff735c] rounded-md border-0 text-white">Get Started</button>
      </div>
      <div className="flex-1 w-full h-full">
         <img src="https://i.ibb.co/6tLg5HD/etienne-beauregard-riverin-B0a-Cv-AVSX8-E-unsplash.jpg" alt=""  className="rounded-md w-full h-full object-cover"/>
      </div>
    </div>
  );
};

export default Banner;
