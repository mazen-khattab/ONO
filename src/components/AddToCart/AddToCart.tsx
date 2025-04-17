import React, { useState, useRef } from "react";
import "./AddToCart.css";
import { useCart } from "../../CartContext";
import { motion, AnimatePresence } from "framer-motion";

const AddToCart = ({
  Product,
  quant = 1,
  disable = true,
  increaseable = false,
}) => {
  const [go, setGo] = useState(false);
  const [activeIncrease, setActiveIncrease] = useState(increaseable);
  const [quantity, setQuantity] = useState(quant);
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useCart();

  const handleAddToCart = () => {
    addToCart(Product, quantity);
    setGo(true);
    setTimeout(() => setGo(false), 2000);
  };

  const increase = (product) => {
    if (activeIncrease) {
      setQuantity((prev) => prev + 1);
      increaseQuantity(product.id);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = (product) => {
    if (activeIncrease) {
      setQuantity((prev) => Math.max(1, prev - 1));
      decreaseQuantity(product.id);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <div className="add-to-cart-container">
      <div className="quantity-selector">
        <button
          className="decrease"
          onClick={() => decrease(Product)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button className="increase" onClick={() => increase(Product)}>
          +
        </button>
      </div>
      <button
        style={disable ? { display: "flex" } : { display: "none" }}
        className="cart-btn"
        onClick={() => {
          handleAddToCart();
        }}
      >
        {go ? (
          <motion.i
            className="fa-solid fa-check check"
            initial={{ left: "-50%" }}
            animate={{
              left: [
                "-50%",
                "50%",
                "50%",
                "50%",
                "50%",
                "50%",
                "50%",
                "50%",
                "-50%",
              ],
            }}
            transition={{
              duration: 1.5,
            }}
          />
        ) : (
          <i className="fa-solid fa-check check" />
        )}

        {go ? (
          <motion.i
            className="fa-solid fa-cart-plus cart-plus"
            initial={{ left: "50%" }}
            animate={{
              left: [
                "50%",
                "250%",
                "250%",
                "250%",
                "250%",
                "250%",
                "250%",
                "250%",
                "50%",
              ],
            }}
            transition={{
              duration: 1.5,
            }}
          />
        ) : (
          <i className="fa-solid fa-cart-plus cart-plus" />
        )}
      </button>
    </div>
  );
};

export default AddToCart;
