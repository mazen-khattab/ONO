import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

const ITEMS_PER_PAGE = 12;

const categories = [
  "All Categories",
  "Brain Teasers",
  "Wooden Puzzles",
  "Logic Games",
  "3D Puzzles",
  "Educational Toys",
];

const ageRanges = ["3-6 years", "7-12 years", "13+ years", "Adult"];

const products = [
  {
    id: 1,
    name: "Quantum Maze Master",
    category: "Brain Teasers",
    price: 29.99,
    ageRange: "7-12 years",
    description: "A challenging 3D maze that tests spatial awareness",
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Wooden Logic Blocks",
    category: "Wooden Puzzles",
    price: 24.99,
    ageRange: "3-6 years",
    description: "Natural wooden blocks for developing logical thinking",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Crystal Cube Challenge",
    category: "3D Puzzles",
    price: 34.99,
    ageRange: "13+ years",
    description: "Advanced 3D puzzle with crystal-clear pieces",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Math Adventure Set",
    category: "Educational Toys",
    price: 39.99,
    ageRange: "7-12 years",
    description: "Learn mathematics through fun puzzle challenges",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Logic Master Pro",
    category: "Brain Teasers",
    price: 44.99,
    ageRange: "Adult",
    description: "Advanced logic puzzles for experienced puzzle solvers",
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Rainbow Puzzle Set",
    category: "Educational Toys",
    price: 19.99,
    ageRange: "3-6 years",
    description: "Colorful puzzle set for early learning development",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "3D Galaxy Puzzle",
    category: "3D Puzzles",
    price: 49.99,
    ageRange: "13+ years",
    description: "Create a stunning 3D model of the galaxy",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Wooden Maze Set",
    category: "Wooden Puzzles",
    price: 29.99,
    ageRange: "7-12 years",
    description: "Classic wooden maze puzzles with multiple difficulty levels",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Mind Bender Ultimate",
    category: "Brain Teasers",
    price: 54.99,
    ageRange: "Adult",
    description: "The ultimate collection of mind-bending puzzles",
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Junior Logic Kit",
    category: "Logic Games",
    price: 34.99,
    ageRange: "7-12 years",
    description: "Introduction to logic and problem-solving",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Advanced Logic Puzzler",
    category: "Logic Games",
    price: 39.99,
    ageRange: "13+ years",
    description: "Complex logic challenges for advanced puzzle enthusiasts",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Toddler's First Puzzle",
    category: "Educational Toys",
    price: 14.99,
    ageRange: "3-6 years",
    description: "Simple and engaging puzzles for toddlers",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    name: "Professional Cube Set",
    category: "Brain Teasers",
    price: 59.99,
    ageRange: "Adult",
    description: "Professional-grade cube puzzles for speedcubing",
    image:
      "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&q=80",
  },
  {
    id: 14,
    name: "Geometric Wonder",
    category: "3D Puzzles",
    price: 44.99,
    ageRange: "13+ years",
    description: "Complex geometric shapes that transform and combine",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80",
  },
  {
    id: 15,
    name: "Classic Wood Collection",
    category: "Wooden Puzzles",
    price: 49.99,
    ageRange: "7-12 years",
    description: "Traditional wooden puzzles with timeless appeal",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80",
  },
];

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "All Categories",
    ageRange: [],
    priceRange: { min: 0, max: 100 },
    searchQuery: "",
  });
  const [filterActive, setFilterActive] = useState();

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category === "All Categories" ||
      product.category === filters.category;
    const matchesAge =
      filters.ageRange.length === 0 ||
      filters.ageRange.includes(product.ageRange);
    const matchesPrice =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;
    const matchesSearch =
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return matchesCategory && matchesAge && matchesPrice && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleAgeRangeChange = (range: string) => {
    setFilters((prev) => ({
      ...prev,
      ageRange: prev.ageRange.includes(range)
        ? prev.ageRange.filter((r) => r !== range)
        : [...prev.ageRange, range],
    }));
    setCurrentPage(1);
  };

  const activeFilter = () => {
    setFilterActive(!filterActive);
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />

      <div className="allProducts-page">
        <div className="allProducts-header"></div>
        <div className="allProducts-container">
          <div className="productFilters-section">
            <div className={filterActive? "filter-title space" : "filter-title"}
            onClick={activeFilter}>
              <p>Filter</p>
              <i className={filterActive? "fa-solid fa-angle-down" : "fa-solid fa-angle-down turn"}></i>
            </div>
            <aside className={filterActive? "productFilter-aside appear" : "productFilter-aside"}>
              <div className="productFilter-group">
                <h3 className="productFilter-title">Search</h3>
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchQuery: e.target.value,
                      }))
                    }
                    className="productForm-input"
                  />
                </div>
              </div>

              <div className="productFilter-group">
                <h3 className="productFilter-title">Category</h3>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
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
                <h3 className="productFilter-title">Price Range</h3>
                <div className="productPrice-range">
                  <div className="range-slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        handlePriceChange("max", Number(e.target.value))
                      }
                      className="productSlider"
                    />
                  </div>
                  <div className="productPrice-display">
                    <span>${filters.priceRange.min}</span>
                    <span>${filters.priceRange.max}</span>
                  </div>
                </div>
              </div>

              <div className="productFilter-group">
                <h3 className="productFilter-title">Age Range</h3>
                <div className="productCheckbox-group">
                  {ageRanges.map((range) => (
                    <label key={range} className="productCheckbox-label">
                      <input
                        type="checkbox"
                        checked={filters.ageRange.includes(range)}
                        onChange={() => handleAgeRangeChange(range)}
                      />
                      {range}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <main>
            <div className="allproducts-grid">
              {paginatedProducts.map((product) => (
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
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ProductsPage;
