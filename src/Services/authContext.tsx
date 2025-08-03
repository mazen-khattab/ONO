import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "./api.js";

const AuthContext = createContext({
  user: null,
  guestId: null,
  setUser: () => {},
  getUser: async () => {},
  getUserProfile: async () => {},
  loading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [guestId, setGuestId] = useState(() => {
    const storedGuestId = localStorage.getItem("GuestId");
    return storedGuestId ? storedGuestId : null;
  });
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await api.get("/Auth/Get-userRoles");
      setUser(response.data);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await api.get("/User/GetUserProfile");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getGuest = async () => {
      const isUser = await getUser();

      if (!isUser) {
        const guestIdKey = "GuestId";
        let guestId = localStorage.getItem(guestIdKey);

        if (!guestId) {
          guestId = uuidv4();
          localStorage.setItem(guestIdKey, guestId);
        }

        setGuestId(guestId);
      }
    };

    getGuest();
  }, []);

  // useEffect(() => {
  //   const guestIdKey = "GuestId";
  //   let guestId = localStorage.getItem(guestIdKey);

  //   if (!guestId && !user) {
  //     guestId = uuidv4();
  //     localStorage.setItem(guestIdKey, guestId);
  //   }

  //   setGuestId(guestId);
  // }, [user, loading]);

  return (
    <AuthContext.Provider
      value={{ user, guestId, loading, setUser, getUser, getUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
