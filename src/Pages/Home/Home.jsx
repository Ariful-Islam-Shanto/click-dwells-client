import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "./Banner";
import Container from "../../Components/Container/Container";
import Footer from "../../Components/Footer/Footer";
import Advertisement from "./Advertisement";

const Home = () => {
  const bg = {
    backgroundImage: `linear-gradient(to right, #00000063, #00000063), url('https://i.ibb.co/6tLg5HD/etienne-beauregard-riverin-B0a-Cv-AVSX8-E-unsplash.jpg')`,
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    <div>
      <div
        style={bg}
        className={` h-full bg-cover bg-center bg-gradient-to-tr  from-[#1a1919] to-[#00000063]`}
      >
        <Container>
          <Navbar />
          <Banner />
        </Container>
      </div>
      <Advertisement/>
      <Footer />
    </div>
  );
};

export default Home;
