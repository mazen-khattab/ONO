import React, { useState } from "react";
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

const products = [
  {
    id: 1,
    name: "3D Crystal Maze",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Challenge your spatial awareness",
    longDescription:
      "The 3D Crystal Maze is an advanced puzzle that tests and enhances your spatial reasoning abilities. With multiple layers of transparent pieces, you'll need to navigate through this intricate maze while considering depth and perspective. Perfect for both beginners and experienced puzzle enthusiasts.",
    ageRange: "8-12",
  },
  {
    id: 2,
    name: "Quantum Puzzle Box",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
    description: "Multi-dimensional problem solving",
    longDescription:
      "The Quantum Puzzle Box is a revolutionary concept in puzzle design. This mind-bending challenge features multiple interconnected mechanisms that must be solved in the correct sequence. Each solution reveals new aspects of the puzzle, creating a truly immersive problem-solving experience.",
    ageRange: "12-16",
  },
  {
    id: 3,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    longDescription:
      "The Rainbow Cube Master takes the classic cube puzzle to new heights with vibrant colors and smooth mechanics. Perfect for beginners learning algorithms or speed-cubing enthusiasts looking to improve their times. Includes a companion app with tutorial videos.",
    ageRange: "6-10",
  },
  {
    id: 4,
    name: "3D Crystal Maze",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Challenge your spatial awareness",
    longDescription:
      "The 3D Crystal Maze is an advanced puzzle that tests and enhances your spatial reasoning abilities. With multiple layers of transparent pieces, you'll need to navigate through this intricate maze while considering depth and perspective. Perfect for both beginners and experienced puzzle enthusiasts.",
    ageRange: "8-12",
  },
  {
    id: 5,
    name: "Little Explorer's Puzzle Set",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
    description: "Educational puzzles for toddlers",
    longDescription:
      "Designed specifically for young minds, the Little Explorer's Puzzle Set includes 6 wooden puzzles with large, easy-to-grip pieces. Each puzzle features bright colors and familiar shapes to help develop fine motor skills and cognitive abilities in toddlers.",
    ageRange: "3-6",
  },
  {
    id: 6,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    longDescription:
      "The Rainbow Cube Master takes the classic cube puzzle to new heights with vibrant colors and smooth mechanics. Perfect for beginners learning algorithms or speed-cubing enthusiasts looking to improve their times. Includes a companion app with tutorial videos.",
    ageRange: "6-10",
  },
  {
    id: 7,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    longDescription:
      "The Rainbow Cube Master takes the classic cube puzzle to new heights with vibrant colors and smooth mechanics. Perfect for beginners learning algorithms or speed-cubing enthusiasts looking to improve their times. Includes a companion app with tutorial videos.",
    ageRange: "6-10",
  },
  {
    id: 8,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    longDescription:
      "The Rainbow Cube Master takes the classic cube puzzle to new heights with vibrant colors and smooth mechanics. Perfect for beginners learning algorithms or speed-cubing enthusiasts looking to improve their times. Includes a companion app with tutorial videos.",
    ageRange: "6-10",
  },
  {
    id: 9,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    longDescription:
      "The Rainbow Cube Master takes the classic cube puzzle to new heights with vibrant colors and smooth mechanics. Perfect for beginners learning algorithms or speed-cubing enthusiasts looking to improve their times. Includes a companion app with tutorial videos.",
    ageRange: "6-10",
  },
  // ... other products
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2 className="section-title">Featured Products</h2>

        <div className="products-grid">
          <Swiper
            effect={"coverflow"}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={35}
            loop={true}
            // autoplay={{
            //   delay: 3000,
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
                <SwiperSlide key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      onClick={() => setSelectedProduct(product)}
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-age">Age: {product.ageRange}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price}</span>
                      <button className="cart-btn">Add to Cart</button>
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
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <h3 className="modal-title">{selectedProduct.name}</h3>
                <p className="modal-description">
                  {selectedProduct.longDescription}
                </p>
                <p className="modal-age">
                  Recommended Age: {selectedProduct.ageRange}
                </p>
                <div className="modal-price">${selectedProduct.price}</div>
                <button className="modal-button">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <a href="AllProducts" className="showAll">
        Show All Products
      </a>
    </section>
  );
};

export default Products;
