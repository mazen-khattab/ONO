import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import {ShoppingBag } from "lucide-react";
import "./Cart.css"

const CartPage = () => {
  const [products, setProducts] = useState([]);

  if (products.length === 0) {
    return (
      <div>
        <Navbar></Navbar>

        <div className="cart-content-empty">
          <ShoppingBag className="empty-cart-icon" />
          <h2>العربه فارغة</h2>
          <h3>لم يتم اضافة اي منتجات الى العربة</h3>
          <a href="./AllProducts" className="cart-shop-now">
            Shop Now
          </a>
        </div>

        <Footer></Footer>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar> 

      <Footer></Footer>
    </div>
  );
};

export default CartPage;
