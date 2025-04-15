import React, { useState } from "react";
import "./AddToCart.css";
import { useCart } from "../../CartContext";

const AddToCart = ({Product}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart();
  };

  return (
    <div className="add-to-cart-container">
      <div className="quantity-selector">
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        <i className="fa-solid fa-cart-plus cart-btn"></i>
      </button>
    </div>
  );
};

export default AddToCart;
