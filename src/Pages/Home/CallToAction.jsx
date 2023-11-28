import React from "react";
import Container from "../../Components/Container/Container";

const CallToAction = () => {
  return (
    <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/5kYt7vW/mumbai-skyline-skyscrapers-construction.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl text-white font-bold">You’re in good hands</h1>
              <p className="mb-5">
              Start your journey towards homeownership today. Join our community of satisfied homeowners who found their ideal property with us. Click below to explore listings, connect with agents, and make your dream home a reality.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CallToAction;
