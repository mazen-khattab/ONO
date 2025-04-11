import React from "react";
import "./Hero.css";
import HomeCarousel from "../HomeCarousel/HomeCarousel.tsx";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { i18n, t } = useTranslation("Home");
  const savedLang = JSON.parse(localStorage.getItem("lang"));

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
          <p>{t("hero.title")}</p>
          <div className="words">
            <span className="word">{t("hero.mind")}</span>
            <span className="word">{t("hero.Intelligence")}</span>
            <span className="word">{t("hero.Thinking")}</span>
            <span className="word">{t("hero.Creativity")}</span>
            <span className="word">{t("hero.mind")}</span>
          </div>
        </div>
        <p className="hero-description">{t("hero.description")}</p>

        <a href="./AllProducts" className="shop-now">
          {t("hero.Shop Now")}
        </a>
      </div>

      <div className="home-carousel-container" style={savedLang?.code === `ar` ? { left: 0 } : {right: 0} }>
        <HomeCarousel classname={savedLang?.code === `ar`? "carousel-container-ar1" : "carousel-container-en1"} />
        <HomeCarousel direction="reverse" classname={savedLang?.code === `ar`? "carousel-container-ar2" : "carousel-container-en2"} />
        <HomeCarousel classname={savedLang?.code === `ar`? "carousel-container-ar3" : "carousel-container-en3"} />
      </div>
    </div>
  );
};

export default Hero;
