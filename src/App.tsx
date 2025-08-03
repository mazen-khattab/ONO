import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Product/Products";
import About from "./components/About/About";
import Discounts from "./components/Discounts/Discounts";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Login/Login";
import Register from "./components/Register/Register";
import Contact from "./components/ContactUs/Contact";
import AllProducts from "./components/AllProducts/ProductsPage";
import WhyUs from "./components/WhyUs/WhyUs";
import UserProfile from "./components/UserProfile/UserProfile";
import CartPage from "./components/CartPage/CartPage";
import { CartProvider } from "./Services/CartContext";
import { AuthProvider } from "./Services/authContext";
import { ProductProvider } from "./Services/ProductsContext";
import { setNavigate } from "./Services/api.js";

function NavigationSetter() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <NavigationSetter />
            <Routes>
              {/* Home Page Route */}
              <Route
                path="/"
                element={
                  <div className="min-h-screen">
                    <Navbar />
                    <Hero />
                    <Products />
                    <Contact />
                    <Discounts />
                    <Footer />
                  </div>
                }
              />

              {/* Login Page Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Register Page Route */}
              <Route path="/register" element={<Register />} />

              {/* All Products Page Route */}
              <Route path="/AllProducts" element={<AllProducts />} />

              {/* Why us page Route */}
              <Route path="/WhyUs" element={<WhyUs />} />

              {/* About Page Route */}
              <Route path="/About" element={<About />} />

              {/* Cart Page Route */}
              <Route path="/Cart" element={<CartPage />} />

              {/* User Profile Route */}
              <Route path="/UserProfile" element={<UserProfile />} />
            </Routes>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;