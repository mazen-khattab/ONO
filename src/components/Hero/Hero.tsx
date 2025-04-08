import React from "react";
import "./Hero.css";
import HomeCarousel from "../HomeCarousel/HomeCarousel.tsx";

const Hero = () => {
  return (
    <div
      className="hero"
      id="hero"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/36/b0/27/36b0278b47d98ef240d4ea29bf1c9d02.jpg)",
      }}
    >
      <div className="hero-overlay" />
      <div className="card">
        <div className="loader">
          <p><span style={{fontWeight: 700}}>Imporve</span> Your Child's</p>
          <div className="words">
            <span className="word">Mind</span>
            <span className="word">Intelligence</span>
            <span className="word">Thinking</span>
            <span className="word">Creativity</span>
            <span className="word">Mind</span>
          </div>
        </div>
        <p className="hero-description">
          Discover our collection of puzzles and intelligent toys
        </p>

        <a href="./AllProducts" className="shop-now">
          Shop Now
        </a>
      </div>

      <div className="home-carousel-container">
        <HomeCarousel classname="carousel-container1" />
        <HomeCarousel direction="reverse" classname="carousel-container2" />
        <HomeCarousel classname="carousel-container3" />
      </div>
    </div>
  );
};

export default Hero;
