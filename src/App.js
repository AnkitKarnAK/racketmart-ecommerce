import "./App.css";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import { useDataContext } from "./context/data-context";
import { apiRequest } from "./api/api-request";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Error404 from "./components/Error404";

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
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        limit={3}
      />
    </div>
  );
}

export default App;
