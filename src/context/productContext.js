import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, []);

  const buy = async (data) => {
    const products = JSON.parse((await AsyncStorage.getItem("cart")) || []);
    if (products.some((item) => item.title === data.title) === false) {
      let cart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
      cart.push({ ...data, amount: 1 });
      return await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("Este produto já está em seu carrinho!");
    }
  };

  const filter = (data) => {
    return setItems(
      products.filter(
        (item) =>
          item.title.toLowerCase().replace(/[\W+]/g, "") ===
          data.toLowerCase().replace(/[\W+]/g, "")
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, items, buy, filter }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
