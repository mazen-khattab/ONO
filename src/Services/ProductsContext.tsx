import React, { createContext, useState, useContext, useEffect } from "react";
import api from "./api.js";

type ProductContextType = {
  getProducts: (
    pageNumber?: number,
    pageSize?: number,
    search?: string,
    cateName?: string,
    ageRange?: number
  ) => Promise<any>;
};

const ProductContext = createContext<ProductContextType>({
  getProducts: async () => { return {}; },
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productLoading, setProductLoading] = useState(false);
  
  const getProducts = async (
    pageNumber = 1,
    pageSize = 12,
    search = "",
    cateName = "",
    ageRange = 0
  ) => {
    try {
      setProductLoading(true)
      const response = await api.get("/Product/GetProducts", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          Search: search,
          cateName: cateName,
          ageRange: ageRange,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setProductLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
