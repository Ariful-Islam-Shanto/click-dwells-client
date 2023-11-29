import React from "react";
import Container from "../../Components/Container/Container";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const OurServices = () => {
  return (
    <div className="py-16">
      <Container>
        <div className="space-y-8 px-5 md:px-0">
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
              Our Services
            </h1>
            <p className="font-thin">What special about us?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <FaClipboardList className="text-4xl"/>
                <h2 className="card-title">Property Listings</h2>
                <p>
                  Provide a vast collection of property listings, including
                  houses, apartments, commercial spaces, and more.Ensure that
                  the listings are well-categorized and easy to navigate.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <MdOutlinePayment className="text-4xl"/>
                <h2 className="card-title">Secure Transactions</h2>
                <p>
                  Ensure secure and transparent transactions for property
                  purchases. Describe any secure payment gateways or processes
                  in place.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <RiVerifiedBadgeFill className="text-4xl"/>
                <h2 className="card-title">Property Verification</h2>
                <p>
                  Mention any processes in place to verify and authenticate
                  property listings. Build trust by assuring users that listed
                  properties have been vetted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
