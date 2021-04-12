import React from "react";
import { useDataContext } from "../context/data-context";
import CartDetails from "./CartDetails";
import { CartItem } from "./CartItem";

function Cart() {
  const { cartItems } = useDataContext();

  return (
    <div>
      <div className="h2 text-center">This is Cart {cartItems.length}</div>
      <div className="cart-container">
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
        <CartDetails />
      </div>
    </div>
  );
}

export default Cart;
