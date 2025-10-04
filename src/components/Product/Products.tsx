import React, { useEffect, useState, useRef } from "react";
import { X, Search, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Products.css";
import { useTranslation } from "react-i18next";
import AddToCart from "../AddToCart/AddToCart";
import { useProducts } from "../../Services/ProductsContext";

type Product = {
  productId: string;
  name: string;
  description: string;
  ageRange: string;
  price: number;
  imageUrl: string;
  gallary: { imageUrl: string; altText: string }[];
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { i18n, t } = useTranslation("Home");
  const { getProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);

  let gallaryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(1, 15);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const next = () => {
    if (gallaryContainerRef.current) {
      console.log(gallaryContainerRef.current.offsetWidth);
      gallaryContainerRef.current.scrollBy({
        left: gallaryContainerRef.current.offsetWidth,
        behavior: "smooth",
      });

      setCurrentDotIndex((prevIndex) =>
        prevIndex === selectedProduct.gallary.length - 1
          ? prevIndex
          : prevIndex + 1
      );
    }
  };

  const prev = () => {
    if (gallaryContainerRef.current) {
      gallaryContainerRef.current.scrollBy({
        left: -gallaryContainerRef.current.offsetWidth,
        behavior: "smooth",
      });

      setCurrentDotIndex((prevIndex) =>
        prevIndex === 0 ? prevIndex : prevIndex - 1
      );
    }
  };

  const closeTheSelectedProduct = () => {
    setSelectedProduct(null);
    setCurrentDotIndex(0);
  };

  return (
    <section
      id="products"
      className="products-section"
      style={{ direction: "ltr" }}
    >
      <div className="products-container">
        <h2 className="products-section-title">
          {t("featured products.title")}
        </h2>

        <div className="products-grid">
          <Swiper
            effect={"coverflow"}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={40}
            loop={true}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper-container"
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product.productId} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                      onClick={() => setSelectedProduct(product)}
                    />
                  </div>

                  <div className="product-info">
                    <div
                      className="product-header"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <p className="product-age">Age: {product.ageRange}</p>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">${product.price}</span>
                      <AddToCart Product={product}></AddToCart>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            <div className="slider-controller">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>

              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>

              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={closeTheSelectedProduct}
              className="close-button"
            >
              <X />
            </button>
            <div className="modal-grid">
              <div className="modal-image">
                {selectedProduct.gallary?.length <= 0 ? (
                  <div className="modal-image">
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                    />
                  </div>
                ) : (
                  <div className="gallary-image" ref={gallaryContainerRef}>
                    <div className="prev navigation-button" onClick={prev}>
                      <i className="fa-solid fa-caret-left"></i>
                    </div>
                    {selectedProduct.gallary?.map((img) => (
                      <img
                        key={img.altText}
                        src={img.imageUrl}
                        alt={img.altText}
                      />
                    ))}
                    <div className="next navigation-button" onClick={next}>
                      <i className="fa-solid fa-caret-right"></i>
                    </div>

                    <div className="gallary-dot-container">
                      {selectedProduct.gallary.map((_, index) => (
                        <i
                          key={index}
                          className={
                            index === currentDotIndex
                              ? "gallary-dot active"
                              : "gallary-dot"
                          }
                        ></i>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-details">
                <h3 className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-description">
                  {selectedProduct.description}
                </p>
                <p className="modal-age">
                  Recommended Age: {selectedProduct.ageRange}
                </p>
                <div className="price-cart">
                  <div className="modal-price">${selectedProduct.price}</div>
                  <AddToCart Product={selectedProduct}></AddToCart>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <a href="AllProducts" className="showAll">
        {t("featured products.show")}
      </a>
    </section>
  );
};

export default Products;
