import React, { useState } from "react";
import "./AddToCart.css";
import { useCart } from "../../CartContext";

const AddToCart = ({ Product, quant = 1}) => {
  const [quantity, setQuantity] = useState(quant);
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
        <button className="decrease" onClick={() => decrease(Product)} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button className="increase" onClick={() => increase(Product)}>+</button>
      </div>
      <button className="cart-btn fa-solid fa-cart-plus" onClick={handleAddToCart}> 
      </button>
    </div>
  );
};


export default AddToCart;
