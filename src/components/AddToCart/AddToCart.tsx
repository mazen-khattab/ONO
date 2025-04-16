import React, { useState } from "react";
import "./AddToCart.css";
import { useCart } from "../../CartContext";

const AddToCart = ({ Product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart(Product, quantity);
  };

  const increase = (product) => {
    increaseQuantity(product.id);
    setQuantity((prev) => prev + 1);
  };

  const decrease = (product) => {
    decreaseQuantity(product.id);
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="add-to-cart-container">
      <div className="quantity-selector">
        <button onClick={() => decrease(Product)} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increase(Product)}>+</button>
      </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        <i className="fa-solid fa-cart-plus cart-btn"></i>
      </button>
    </div>
  );
};


export default AddToCart;
