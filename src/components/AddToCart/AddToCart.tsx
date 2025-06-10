import React, { useState, useEffect } from "react";
import "./AddToCart.css";
import { useCart } from "../../Services/CartContext";
import { useAuth } from "../../Services/authContext";
import api from "../../Services/api";
import { motion, AnimatePresence } from "framer-motion";

const AddToCart = ({
  Product,
  quant = 1,
  disable = true,
  increaseable = false,
}) => {
  const { user } = useAuth();

  const [go, setGo] = useState(false);
  const [active, setActive] = useState(true);
  const [activeIncrease, setActiveIncrease] = useState(increaseable);
  const [quantity, setQuantity] = useState(quant);
  const { addToCart, setCartItems, increaseQuantity, decreaseQuantity } =
    useCart();

  const handleAddToCart = () => {
    if (active) {
      AddedToCart();
    }

    setActive(false);

    setTimeout(() => {
      setActive(true);
    }, 2000);
  };

  const AddedToCart = async () => {
    if (user) {
      const response = await api.post("/Cart/AddToCart", null, {
        params: {
          userId: user.userId,
          productId: Product.productId,
          amount: quantity,
        },
      });
      console.log(response.data);
      addToCart(response.data, quantity);
    } else {
      addToCart(Product, quantity);
    }

    setGo(true);
    setTimeout(() => setGo(false), 2000);
    setQuantity(1);
  };

  useEffect(() => {
    setQuantity(quant);
  }, [quant]);

  const increase = async (product) => {
    if (activeIncrease) {
      setQuantity((prev) => prev + 1);
      increaseQuantity(product.productId);

      if (user) {
        try {
          const response = await api.put("/Cart/Increase", null, {
            params: {
              userId: user.userId,
              productId: product.productId,
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = (product) => {
    if (activeIncrease) {
      setQuantity((prev) => Math.max(1, prev - 1));
      decreaseQuantity(product.productId);
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
