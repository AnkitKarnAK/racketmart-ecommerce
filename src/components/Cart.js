import React from "react";
import { useDataContext } from "../context/data-context";
import CartDetails from "./CartDetails";
import CartEmpty from "./CartEmpty";
import { CartItem } from "./CartItem";

function Cart() {
  const { state } = useDataContext();

  return (
    <div>
      {state.itemsInCart?.length > 0 ? (
        <div className="cart-container">
          {state.itemsInCart.map((item) => {
            return (
              <CartItem
                key={item._id}
                cartItem={item.productId}
                quantity={item.quantity}
              />
            );
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
