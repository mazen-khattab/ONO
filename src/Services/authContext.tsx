import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "./api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await api.get("/Auth/Get-Profile");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const guestIdKey = "GuestId";
    let guestId = localStorage.getItem(guestIdKey);

    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem(guestIdKey, guestId);
    }

    setGuestId(guestId)
  // if (!user && loading === false) {
  // }
}, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, guestId, setUser, getUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
