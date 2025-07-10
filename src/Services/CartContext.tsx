import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authContext";
import api from "./api.js";

const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  loading: false,
  setCartItems: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, guestId } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(true);

  const cartCount = cartItems.reduce(
    (count: number, item: any) => count + item.productAmount,
    0
  );

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      const cart = localStorage.getItem("cart");
      var cartData = cart ? JSON.parse(cart) : [];

      cartData.map(async (element: any) => {
        try {
          const response = await api.delete("/Cart/DeleteGuestItem", {
            params: {
              productID: element.productId,
            },
            headers: { GuestId: guestId },
          });

        } catch (error) {
          console.error(error);
        }

        try {
          const response = await api.post("/Cart/AddToCart", null, {
            params: {
              productID: element.productId,
              amount: element.productAmount,
            },
          });
          
        } catch (error) {
          console.error(error);
        }
      });

      localStorage.removeItem("cart");
      localStorage.removeItem("GuestId");

      const GetAllUserProducts = async () => {
        try {
          const response = await api.get("/Cart/GetUserProducts");
          setCartItems(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      GetAllUserProducts();
    }
  }, [user]);

  useEffect(() => {
    const GetAllGuestProducts = async () => {
      try {
        const response = await api.get("/Cart/GetGuestProducts", {
          headers: { GuestId: guestId },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!user && guestId) {
      GetAllGuestProducts();
    }
  }, [user, guestId]);

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
          ? {
              ...item,
              productAmount: item.productAmount + 1,
              reserved: item.reserved + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.productAmount > 1
          ? {
              ...item,
              productAmount: item.productAmount - 1,
              reserved: item.reserved - 1,
            }
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
