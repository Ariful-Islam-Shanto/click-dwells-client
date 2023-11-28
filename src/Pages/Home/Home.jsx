import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "./Banner";
import Container from "../../Components/Container/Container";
import Footer from "../../Components/Footer/Footer";
import Advertisement from "./Advertisement";
import Testimonial from "./Testimonial";

const Home = () => {
  const bg = {
    backgroundImage: `linear-gradient(to right, #fff9ce63, #00000063), url('https://i.ibb.co/6tLg5HD/etienne-beauregard-riverin-B0a-Cv-AVSX8-E-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundOpacity : '50%'
  };

  return (
    <div>
      <div
        style={bg}
        className={` h-full bg-cover bg-center bg-gradient-to-tr  from-[#1a1919] to-[#fff9ce63]`}
      >
        <Container>
          <Navbar />
          <Banner />
        </Container>
      </div>
      <Advertisement/>
      <Testimonial/>
      <Footer />
    </div>
  );
};

export default Home;
