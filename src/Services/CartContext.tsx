import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authContext";
import api from "./api.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(true); 

  const cartCount = cartItems.reduce(
    (count, item) => count + item.productAmount,
    0
  );

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      var cartData = JSON.parse(localStorage.getItem("cart")) || [];

      cartData.map(async (element) => {
        const response = await api.post("/Cart/AddToCart", null, {
          params: {
            userId: user.userId,
            productID: element.productId,
            amount: element.productAmount,
          },
        });
      });

      localStorage.removeItem("cart");

      const GetAllUserProducts = async () => {
        try {
          const response = await api.get("/Cart/GetUserProducts", {
            params: { userId: user.userId },
          });
          setCartItems(response.data)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      GetAllUserProducts();
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId
            ? { ...item, productAmount: item.productAmount + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, productAmount: quantity }];
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, productAmount: item.productAmount + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.productAmount > 1
          ? { ...item, productAmount: item.productAmount - 1 }
          : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== product.productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
