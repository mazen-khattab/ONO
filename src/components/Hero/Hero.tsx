import { useEffect, useState } from "react";
import "./Hero.css";
import HomeCarousel from "../HomeCarousel/HomeCarousel.tsx";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../Services/ProductsContext.tsx";

const Hero = () => {
  const { t } = useTranslation("Home");
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  const [singleCarousleCount, setSingleCarouselCont] = useState(0);
  const [products, setProducts] = useState([]);
  const { getProducts } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(1, 30);
        setSingleCarouselCont(response.pageSize / 3);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

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

      <div
        className="home-carousel-container"
        style={savedLang?.code === `ar` ? { left: 0 } : { right: 0 }}
      >
        <HomeCarousel
          products={products.slice(0, singleCarousleCount)}
          classname={
            savedLang?.code === `ar`
              ? "carousel-container-ar1"
              : "carousel-container-en1"
          }
        />
        <HomeCarousel
          products={products.slice(singleCarousleCount, singleCarousleCount * 2)}
          direction="reverse"
          classname={
            savedLang?.code === `ar`
              ? "carousel-container-ar2"
              : "carousel-container-en2"
          }
        />
        <HomeCarousel
          products={products.slice((singleCarousleCount * 2), singleCarousleCount * 3)}
          classname={
            savedLang?.code === `ar`
              ? "carousel-container-ar3"
              : "carousel-container-en3"
          }
        />
      </div>
    </div>
  );
};

export default Hero;
