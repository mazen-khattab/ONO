import React, { useEffect, useState } from "react";
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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { i18n, t } = useTranslation("Home");

  const { getProducts } = useProducts();
  const [products, setProducts] = useState([]);

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
                    <div className="product-header" onClick={() => setSelectedProduct(product)}>
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
              onClick={() => setSelectedProduct(null)}
              className="close-button"
            >
              <X />
            </button>
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
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
