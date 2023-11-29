import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "./Banner";
import Container from "../../Components/Container/Container";
import Footer from "../../Components/Footer/Footer";
import Advertisement from "./Advertisement";
import Testimonial from "./Testimonial";
import OurServices from "./OurServices";
import CallToAction from "./CallToAction";
import { Helmet } from "react-helmet";

const Home = () => {

  return (
    <div>
         <Helmet>
                <title>Click Dwells | Home</title>
            </Helmet>
      <div
        className={` h-full bg-cover bg-center bg-gradient-to-tr  from-[#dedada] to-[#fff9ce63]`}
      >
        <Container>
          <Navbar />
          <Banner />
        </Container>
      </div>
      <OurServices/>
      <Advertisement/>
      <Testimonial/>
      <CallToAction/>
      <Footer />
    </div>
  );
};

export default Home;
