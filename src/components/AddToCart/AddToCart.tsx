import { useState, useEffect } from "react";
import "./AddToCart.css";
import { useCart } from "../../Services/CartContext";
import { useAuth } from "../../Services/authContext";
import { motion } from "framer-motion";
import { useMessage } from "../../Services/MessageContext";
import api from "../../Services/api";

const AddToCart = ({ Product, quant = 1 }) => {
  const { user, guestId } = useAuth();
  const { showMessage } = useMessage();

  const [go, setGo] = useState(false);
  const [active, setActive] = useState(true);
  const [quantity, setQuantity] = useState(quant);
  const [canAddToCart, setCanAddToCart] = useState(true);
  const { addToCart } = useCart();

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
      try {
        const response = await api.post("/Cart/AddToCart", null, {
          params: {
            productId: Product.productId,
            amount: quantity,
          },
        });

        addToCart(response.data, quantity);
      } catch (error) {
        console.error(error);
      } finally {
        showMessage("The product has been added to cart", true);
      }
    } else {
      try {
        await api.post("/Cart/AddToGuestCart", null, {
          params: {
            productID: Product.productId,
            amount: quantity,
          },
          headers: { GuestId: guestId },
        });

        addToCart(Product, quantity);
      } catch (error) {
        console.error(error);
      } finally {
        showMessage("The product has been added to cart", true);
      }
    }

    Product.reserved += quantity;

    setGo(true);
    setTimeout(() => setGo(false), 2000);
    setQuantity(1);
  };

  useEffect(() => {
    setCanAddToCart(Product.reserved + quantity <= Product.stockUnit);
  }, [Product.reserved]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="add-to-cart-container">
      <div className="quantity-selector">
        <button
          className="decrease"
          onClick={decrease}
          disabled={quantity <= 1}
        >
          {" "}
          -{" "}
        </button>
        <span className="amount">{quantity}</span>
        <button
          className="increase"
          onClick={increase}
          disabled={quantity + Product.reserved >= Product.stockUnit}
        >
          {" "}
          +{" "}
        </button>
      </div>
      <button
        style={
          canAddToCart
            ? { backgroundColor: "#dc2626", cursor: "pointer" }
            : { backgroundColor: "#b9b9b9", cursor: "no-drop" }
        }
        className="cart-btn"
        onClick={() => {
          canAddToCart && handleAddToCart();
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
