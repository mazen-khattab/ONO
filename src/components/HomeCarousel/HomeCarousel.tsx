import React, { useState } from "react";
import "./HomeCarousel.css";

interface HomeCarouselProps {
  direction?: "normal" | "reverse";
  classname?: string;
  products: any[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = (props) => {
  const [isPaused, setIsPaused] = useState(false);
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
  

  return (
    <div
      className={`${props.classname} ${
        savedLang?.code === `ar`
          ? "carousel-container-ar"
          : "carousel-container-en"
      } carousel-container`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`carousel-track ${isPaused ? "paused" : ""}`}
        style={{ animationDirection: props.direction }}
      >
        {props.products.map((item, index) => (
          <div key={`${item.productId}-${index}`} className="carousel-item">
            <div className="carousel-card">
              {/* Front side */}
              <div className="card-front">
                <img src={item.imageUrl} alt={item.name} loading="lazy"/>
                <div className="card-front-content">
                  <h3>{item.name}</h3>
                </div>
              </div>

              {/* Back side */}
              <div className="card-back">
                <div className="card-back-content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
