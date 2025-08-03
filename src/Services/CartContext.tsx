import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authContext";
import api from "./api.js";
import { mirrorEasing } from "framer-motion";

const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  loading: false,
  setCartItems: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  getUserProducts: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, guestId, loading } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [cartLoading, setCartLoading] = useState(true);

  const cartCount = cartItems.reduce(
    (count: number, item: any) => count + item.productAmount,
    0
  );

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const getUserProducts = async () => {
    const response = await api.get("/Cart/GetUserProducts");
    setCartItems(response.data);

    return response.data;
  };

  const migrateGuestCartData = async () => {
    await api.delete("/Cart/DeleteAllGuestItems", {
      headers: { GuestId: guestId },
    });

    await Promise.all(
      cartItems.map((item: any) =>
        api.post("/Cart/AddToCart", null, {
          params: {
            productID: item.productId,
            amount: item.productAmount,
          },
        })
      )
    );

    localStorage.removeItem("cart");
    localStorage.removeItem("GuestId");
  };

  useEffect(() => {
    const migrateCart = async () => {
      try {
        if (guestId) {
          await migrateGuestCartData();
        }

        await getUserProducts();

      } catch (error) {
        console.error("Error migrating cart:", error);
      } finally {
        setCartLoading(false);
      }
    };

    const GetAllGuestProducts = async () => {
      try {
        const response = await api.get("/Cart/GetGuestProducts", {
          headers: { GuestId: guestId },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setCartLoading(false);
      }
    };

    if (user && !loading) {
      migrateCart();
    } else if (!user && guestId && !loading) {
      GetAllGuestProducts();
    }
  }, [loading]);

  // useEffect(() => {
  //   const migrateCart = async () => {
  //     try {
  //       await migrateGuestCartData();

  //       const response = await api.get("/Cart/GetUserProducts");
  //       console.log(response.data);
  //       setCartItems(response.data);
  //     } catch (error) {
  //       console.error("Error migrating cart:", error);
  //     } finally {
  //       setCartLoading(false);
  //     }
  //   };

  //   if (user && guestId) {
  //     console.log("a change just happen to the user");
  //     migrateCart();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (!user && guestId && !loading) {
  //     const GetAllGuestProducts = async () => {
  //       try {
  //         const response = await api.get("/Cart/GetGuestProducts", {
  //           headers: { GuestId: guestId },
  //         });
  //         setCartItems(response.data);
  //         console.log(response.data)
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setCartLoading(false);
  //       }
  //     };

  //     GetAllGuestProducts();
  //   }
  // }, [user, guestId, loading]);

  const addToCart = (product: any, quantity = 1) => {
    setCartItems((prevItems: any[]) => {
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

  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems: any[]) =>
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

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems: any[]) =>
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

  const removeFromCart = (product: any) => {
    setCartItems((prevItems: any[]) =>
      prevItems.filter((item) => item.productId !== product.productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartLoading,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        migrateGuestCartData,
        getUserProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
