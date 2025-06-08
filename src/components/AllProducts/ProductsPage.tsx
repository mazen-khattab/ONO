import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import AddToCart from "../AddToCart/AddToCart";
import api from "../../Services/api.js";

const pageSize = 6;

const ageRanges = [3, 6, 9, 12];

const ProductsPage = () => {
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
  const { t } = useTranslation("AllProducts");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: pageSize,
    Search: "",
    cateName: "",
    ageRange: 0,
  });

  const GetAllProducts = async () => {
    try {
      const response = await api.get("/Product/GetProducts", {
        params: filters,
      });
      setProducts(response.data.data);
      setPagesCount(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, [filters]);

  useEffect(() => {
    const GetAllCategories = async () => {
      try {
        const response = await api.get("/Category/GetCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    GetAllCategories();
  }, []);

  const [filterActive, setFilterActive] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value, pageNumber: 1 }));

  };

  const handleAgeRangeChange = (range: number) => {
    setFilters((prev) => ({ ...prev, ageRange: range, pageNumber: 1 }));
  };

  const activeFilter = () => {
    setFilterActive(!filterActive);
  };

  const navigateToPage = (page) => {
    if (page !== filters.pageNumber) {
      setFilters((prev) => ({...prev, pageNumber: page}))
    }
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
                value={filters.Search}
                name="Search"
                onChange={(e) => handleChange(e)}
                className="productForm-input"
                style={{ paddingRight: "30px" }}
              />
              <i
                className="fa-solid fa-magnifying-glass search-icon"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, Search: search }))
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
                      setFilters((prev) => ({ ...prev, Search: search }))
                    }
                  ></i>
                </div>
              </div>

              <div className="productFilter-group">
                <h3 className="productFilter-title">{t("category")}</h3>
                <select
                  value={filters.cateName}
                  onChange={(e) => handleChange(e)}
                  name="cateName"
                  className="productForm-input"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
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
                      {range}+ {t("years")}
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
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="allProduct-info">
                    <div className="allProduct-category">
                      {product.cateName}
                    </div>
                    <h3 className="allProduct-name">{product.name}</h3>
                    <p className="allProduct-description">
                      {product.description.slice(0, 50)}...
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

        <div className="pagination">
          <button
            className="pagination-arrow"
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                pageNumber: filters.pageNumber - 1,
              }));
              window.scrollTo(0, 0);
            }}
            disabled={filters.pageNumber <= 1 ? true : false}
          >
            <i className="fa-solid fa-left-long"></i>
          </button>
          <span>
            {pages.map((page) => (
              <span
                key={page}
                className={
                  filters.pageNumber === page
                    ? "pagination-pages page-active"
                    : "pagination-pages"
                }
                onClick={() => {navigateToPage(page); window.scrollTo(0, 0);}}
              >
                {page}
              </span>
            ))}
          </span>
          <button
            className="pagination-arrow"
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                pageNumber: filters.pageNumber + 1,
              }));
              window.scrollTo(0, 0);
            }}
            disabled={filters.pageNumber >= pagesCount ? true : false}
          >
            <i className="fa-solid fa-right-long"></i>
          </button>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ProductsPage;
