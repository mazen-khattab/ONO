import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import AddToCart from "../AddToCart/AddToCart";
import { Search } from "lucide-react";
import { use } from "i18next";

const categories = [
  "All Categories",
  "Brain Teasers",
  "Wooden Puzzles",
  "Logic Games",
  "3D Puzzles",
  "Educational Toys",
];

const ageRanges = [3, 6, 9, 12];

const products = [
  {
    id: 1,
    name: "3D Crystal Maze",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Challenge your spatial awareness",
    ageRange: "8-12",
    category: "Brain Teasers",
  },
  {
    id: 2,
    name: "Quantum Puzzle Box",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
    description: "Multi-dimensional problem solving",
    ageRange: "12-16",
    category: "Wooden Puzzles",
  },
  {
    id: 3,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    ageRange: "6-10",
    category: "3D Puzzles",
  },
  {
    id: 4,
    name: "3D Crystal Maze",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Challenge your spatial awareness",
    ageRange: "8-12",
    category: "Educational Toys",
  },
  {
    id: 5,
    name: "Little Explorer's Puzzle Set",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
    description: "Educational puzzles for toddlers",
    ageRange: "3-6",
    category: "Brain Teasers",
  },
  {
    id: 6,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    ageRange: "6-10",
    category: "Educational Toys",
  },
  {
    id: 7,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    ageRange: "6-10",
    category: "3D Puzzles",
  },
  {
    id: 8,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    ageRange: "6-10",
    category: "Wooden Puzzles",
  },
  {
    id: 9,
    name: "Rainbow Cube Master",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    description: "Classic puzzle with a colorful twist",
    ageRange: "6-10",
    category: "Brain Teasers",
  },
  {
    id: 10,
    name: "Junior Logic Kit",
    price: 34.99,
    ageRange: "7-12 years",
    description: "Introduction to logic and problem-solving",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
    category: "Logic Games",
  },
  {
    id: 11,
    name: "Advanced Logic Puzzler",
    price: 39.99,
    ageRange: "13+ years",
    description: "Complex logic challenges for advanced puzzle enthusiasts",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
    category: "Logic Games",
  },
  {
    id: 12,
    name: "Toddler's First Puzzle",
    price: 14.99,
    ageRange: "3-6 years",
    description: "Simple and engaging puzzles for toddlers",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
    category: "Educational Toys",
  },
  {
    id: 13,
    name: "Professional Cube Set",
    price: 59.99,
    ageRange: "Adult",
    description: "Professional-grade cube puzzles for speedcubing",
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
    category: "Brain Teasers",
  },
  {
    id: 14,
    name: "Geometric Wonder",
    price: 44.99,
    ageRange: "13+ years",
    description: "Complex geometric shapes that transform and combine",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
    category: "3D Puzzles",
  },
  {
    id: 15,
    name: "Classic Wood Collection",
    price: 49.99,
    ageRange: "7-12 years",
    description: "Traditional wooden puzzles with timeless appeal",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
    category: "Wooden Puzzles",
  },
];

const ProductsPage = () => {
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
  const { t } = useTranslation("AllProducts");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    ageRange: 0,
    searchQuery: "",
  });

  const [filterActive, setFilterActive] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAgeRangeChange = (range: number) => {
    setFilters((prev) => ({ ...prev, ageRange: range }));
  };

  const activeFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <div>
      <Navbar />

      <div className="allProducts-page">
        <div className="filter-section">
          <div className="filter-section-right" onClick={activeFilter}>
            <p>{t("filter")}</p>
            <i className="fa-solid fa-filter"></i>
          </div>

          <div className="filter-section-left">
            <div className="search-input search-input-mobile">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.searchQuery}
                name="searchQuery"
                onChange={(e) => handleChange(e)}
                className="productForm-input"
                style={{ paddingRight: "30px" }}
              />
              <i
                className="fa-solid fa-magnifying-glass search-icon"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, searchQuery: search }))
                }
              ></i>
            </div>
          </div>
        </div>

        <div className="allProducts-container">
          <div
            style={savedLang?.code === `ar` ? { left: 30 } : { right: 30 }}
            className={
              filterActive
                ? "productFilters-section appear"
                : "productFilters-section"
            }
          >
            <i
              className="fa-solid fa-xmark filter-close"
              onClick={activeFilter}
              style={
                savedLang?.code === `ar`
                  ? { marginRight: "auto" }
                  : { marginLeft: "auto" }
              }
            ></i>
            <aside className="productFilter-aside">
              <div className="productFilter-group">
                <h3 className="productFilter-title">{t("search")}</h3>
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="productForm-input"
                    style={{ paddingRight: "30px" }}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass search-icon"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, searchQuery: search }))
                    }
                  ></i>
                </div>
              </div>

              <div className="productFilter-group">
                <h3 className="productFilter-title">{t("category")}</h3>
                <select
                  value={filters.category}
                  onChange={(e) => handleChange(e)}
                  name="category"
                  className="productForm-input"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="productFilter-group">
                <h3 className="productFilter-title">{t("age_range")}</h3>
                <div className="productCheckbox-group">
                  {ageRanges.map((range) => (
                    <label key={range} className="productCheckbox-label">
                      <input
                        type="radio"
                        name="ageRange"
                        onChange={(e) => handleAgeRangeChange(range)}
                      />
                      {range}+   {t("years")}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <main>
            <div className="allproducts-grid">
              {products.map((product) => (
                <div key={product.id} className="allProduct-card">
                  <div className="allProduct-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="allProduct-info">
                    <div className="allProduct-category">
                      {product.category}
                    </div>
                    <h3 className="allProduct-name">{product.name}</h3>
                    <p className="allProduct-description">
                      {product.description}
                    </p>
                    <div className="allProduct-footer">
                      <div className="allProduct-price">${product.price}</div>
                    </div>
                    <AddToCart Product={product}></AddToCart>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ProductsPage;
