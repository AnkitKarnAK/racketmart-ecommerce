import "./App.css";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import { useDataContext } from "./context/data-context";
import { getProductsFromServer } from "./api/api-request";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Error404 from "./components/Error404";
import Login from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import Profile from "./components/Profile";
import { useAuthContext } from "./context/auth-context";
import Signup from "./components/Signup";

function App() {
  const { state, dispatch } = useDataContext();
  const { isUserLogin, userId } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const { response } = await getProductsFromServer({
          url: "https://racketapi.herokuapp.com/products",
          requestType: "GET",
        });
        dispatch({ type: "GET_PRODUCTS", payload: response.data.products });
      } catch (err) {
        alert("failed to fetch ", err);
        console.error(err);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isUserLogin) {
      (async () => {
        try {
          const { response } = await getProductsFromServer({
            url: `https://racketapi.herokuapp.com/carts/${userId}`,
            requestType: "GET",
          });

          dispatch({ type: "GET_CART", payload: response.data.cart });
        } catch (error) {
          console.log(error);
        }

        try {
          const { response } = await getProductsFromServer({
            url: `https://racketapi.herokuapp.com/wishlists/${userId}`,
            requestType: "GET",
          });

          dispatch({ type: "GET_WISHLIST", payload: response.data.wishlist });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isUserLogin, userId, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/profile" element={<Profile />} />
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
