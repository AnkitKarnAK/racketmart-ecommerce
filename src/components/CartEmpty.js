import React from "react";
import { Link } from "react-router-dom";
import emptyCartIcon from "../assests/empty-cart.svg";

function CartEmpty() {
  return (
    <div className="no-item-container">
      <div className="no-item-image-container">
        <img src={emptyCartIcon} alt="No Items in Cart" />
      </div>
      <div className="no-item-content-head">Your cart is empty! </div>
      <div className="no-item-content-text">Add items to it now. </div>
      <Link to="/cart">
        <button className="button-primary"> Shop Now </button>
      </Link>
    </div>
  );
}

export default CartEmpty;
