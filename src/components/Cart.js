import React from "react";
import { useDataContext } from "../context/data-context";
import CartDetails from "./CartDetails";
import CartEmpty from "./CartEmpty";
import { CartItem } from "./CartItem";

function Cart() {
  const { cartItems } = useDataContext();

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="cart-container">
          {cartItems.map((item) => {
            return <CartItem key={item._id} cartItem={item} />;
          })}
          <CartDetails />
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}

export default Cart;
