import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Product/Products";
import About from "./components/About/About";
import Discounts from "./components/Discounts/Discounts";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Login/Login";
import Contact from "./components/ContactUs/Contact";
import HomeCarousel from "./components/HomeCarousel/HomeCarousel";
import AllProducts from "./components/AllProducts/ProductsPage"
import WhyUs from "./components/WhyUs/WhyUs"

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              <Navbar/>
              <Hero />
              <Products />
              <Contact />
              <Discounts />
              <Footer />
            </div>
          }
        />

        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage move={true} />} />

        {/* Register Page Route */}
        <Route path="/register" element={<LoginPage move={false} />} />

        {/* All Products Page Route */}
        <Route path="/AllProducts" element={<AllProducts />} />

        {/* Why us page Route */}
        <Route path="/WhyUs" element={<WhyUs></WhyUs>}/>

        {/* About Page Route */}
        <Route path="/About" element={<About></About>}/>
      </Routes>
    </Router>
  );
}

export default App;
