import React from "react";
import Container from "../Container/Container";
import Lottie from "lottie-react";
import logo from '../../../public/Animation - 1700875593059.json';

const Footer = () => {

  return (
    <div className="bg-base-200 w-full">
    <Container>
      <footer className="flex items-center justify-between footer p-10  text-base-content">
        <aside className="">
            <div className="w-20 h-20">
          <Lottie animationData={logo}></Lottie>
          </div>
          <p>
           <span className="text-whit text-xl text-bold"> ClickDwells</span>
            <br />
            Providing reliable real state since 1992
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </Container>
    </div>
  );
};

export default Footer;
