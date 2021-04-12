import "./App.css";
import React, { useEffect } from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import { useDataContext } from "./context/data-context";
import { apiRequest } from "./api/api-request";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  const { dispatch } = useDataContext();

  useEffect(() => {
    (async () => {
      try {
        const { response } = await apiRequest({
          url: "api/products",
          requestType: "GET",
        });
        dispatch({ type: "GET_PRODUCTS", payload: response.data.products });
      } catch (err) {
        alert("failed to fetch ", err);
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
